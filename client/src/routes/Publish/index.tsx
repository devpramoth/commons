import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Web3 from 'web3'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import { User, Market } from '../../context'
import Step from './Step'
import Progress from './Progress'
import Gdpr from './Gdpr'
import Terms from './Terms'
import ReactGA from 'react-ga'
import { allowPricing } from '../../config'
import { steps } from '../../data/form-publish.json'
import Content from '../../components/atoms/Content'
import { File } from './Files'
import withTracker from '../../hoc/withTracker'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface PublishState {
    name?: string
    dateCreated?: string
    price?: string
    author?: string
    license?: string
    description?: string
    files?: File[]
    type?: AssetType
    copyrightHolder?: string
    categories?: string
    datatype?: string
    currentStep?: number
    publishingStep?: number
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    validationStatus?: any
    gdprModalOpen?: boolean
    gdprAgreed?: boolean
    termsAgreed?: string
    termsModalOpen?: boolean
}

if (allowPricing) {
    ;(steps as any)[0].fields.price = {
        label: 'Price',
        placeholder: 'Price in Ocean tokens',
        type: 'string',
        required: true,
        help: 'Enter the price of assets in Ocean tokens.'
    }
}

class Publish extends Component<{}, PublishState> {
    public static contextType = User

    public state = {
        name: '',
        dateCreated: new Date().toISOString(),
        description: '',
        files: [],
        price: '0',
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: '',
        datatype: '',
        currentStep: 1,
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        publishingStep: 0,
        validationStatus: {
            1: {
                name: false,
                files: false,
                price: false,
                allFieldsValid: false
            },
            2: {
                description: false,
                categories: false,
                allFieldsValid: false
            },
            3: {
                datatype: false,
                author: false,
                copyrightHolder: false,
                license: false,
                allFieldsValid: false
            },
            4: {
                termsAgreed: false,
                allFieldsValid: false
            }
        },
        gdprModalOpen: false,
        gdprAgreed: false,
        termsAgreed: '',
        termsModalOpen: false
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        // check for terms checkbox
        if(event.currentTarget.name === 'termsAgreed'){
            if(this.state.termsAgreed === ''){
                this.setState({ termsModalOpen: true })
            } else {
                this.validateInputs('termsAgreed', '')
                this.setState({ termsAgreed: '' })
            }
            return
        }

        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private agreeTerms = () => {
        this.validateInputs('termsAgreed', 'true')
        this.setState({
            termsModalOpen: false,
            termsAgreed: 'i-agree-with-terms-and-conditions'
        })
    }

    private cancelTerms = () => {
        this.setState({ termsModalOpen: false })
    }

    private next = () => {
        let { currentStep } = this.state

        // check for gdpr on 3 step
        if(
            currentStep === 3 &&
            this.state.gdprAgreed === false && (
                this.state.datatype === "anonymised-personal-data" ||
                this.state.datatype === "personal-data"
            )
        ){
            this.setState({ gdprModalOpen:true })
            return
        }

        const totalSteps = steps.length
        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1
        ReactGA.event({
            category: 'Publish',
            action: 'nextStep ' + currentStep
        })
        this.setState({ currentStep })
    }

    private prev = () => {
        let { currentStep } = this.state
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({ currentStep })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            name: '',
            dateCreated: new Date().toISOString(),
            description: '',
            files: [],
            price: '0',
            author: '',
            type: 'dataset' as AssetType,
            datatype: '',
            license: '',
            copyrightHolder: '',
            categories: '',
            isPublishing: false,
            isPublished: false,
            publishingStep: 0,
            currentStep: 1,
            termsAgreed: '',
            gdprAgreed: false
        })
    }

    private validateInputs = (name: string, value: string) => {
        const hasContent = value.length > 0

        // Setting state for all fields
        if (hasContent) {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: true
                        }
                    }
                }),
                this.runValidation
            )
        } else {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: false
                        }
                    }
                }),
                this.runValidation
            )
        }
    }

    private runValidation = () => {
        const { validationStatus } = this.state
        //
        // Step 1
        //
        if (validationStatus[1].name && validationStatus[1].files) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 2
        //
        if (validationStatus[2].description && validationStatus[2].categories) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 3
        //
        if (
            validationStatus[3].author &&
            validationStatus[3].copyrightHolder &&
            validationStatus[3].license &&
            validationStatus[3].datatype
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 4
        //
        if (
            validationStatus[4].termsAgreed
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    4: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    4: {
                        ...prevState.validationStatus[4],
                        allFieldsValid: false
                    }
                }
            }))
        }
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        ReactGA.event({ category: 'Publish', action: 'registerAsset-start' })

        this.setState({
            publishingError: '',
            isPublishing: true,
            publishingStep: 0
        })

        const { ocean } = this.context
        const account = await ocean.accounts.list()

        // remove `found` attribute from all File objects
        // in a new array
        const files = this.state.files.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ found, ...keepAttrs }: { found: boolean }) => keepAttrs
        )

        const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: this.state.name,
                description: this.state.description,
                dateCreated:
                    new Date(this.state.dateCreated)
                        .toISOString()
                        .split('.')[0] + 'Z', // remove milliseconds
                author: this.state.author,
                license: this.state.license,
                copyrightHolder: this.state.copyrightHolder,
                files,
                price: allowPricing
                    ? Web3.utils.toWei(this.state.price, 'ether')
                    : this.state.price,
                type: this.state.type,
                categories: [this.state.categories]
            }),
            additionalInformation: {
                gdprAgreed: this.state.gdprAgreed ? 'agreed' : 'not-agreed',
                termsAgreed: this.state.termsAgreed ? 'agreed' : 'not-agreed',
                datatype: this.state.datatype
            }
        }

        try {
            const asset = await this.context.ocean.assets
                .create(newAsset, account[0])
                .next((publishingStep: number) =>
                    this.setState({ publishingStep })
                )

            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-end ${asset.id}`
            })
        } catch (error) {
            // make readable errors
            Logger.error('error:', error.message)
            this.setState({ publishingError: error.message })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-error ${error.message}`
            })
        }

        this.setState({ isPublishing: false })
    }

    private agreeGdpr = () => {
        this.setState({
            gdprModalOpen: false,
            gdprAgreed: true
        }, ()=>{
            this.next()
        })
    }

    private cancelGdpr = () => {
        this.setState({ gdprModalOpen: false })
    }

    public render() {
        return (
            <Market.Consumer>
                {market => (
                    <Route
                        title="Publish"
                        description={`Publish a new data set into the Ocean Protocol ${market.network} Network.`}
                    >
                        <Content>
                            <Progress
                                steps={steps}
                                currentStep={this.state.currentStep}
                            />

                            <Form onSubmit={this.registerAsset}>
                                {steps.map((step: any, index: number) => (
                                    <Step
                                        key={index}
                                        index={index}
                                        title={step.title}
                                        description={step.description}
                                        currentStep={this.state.currentStep}
                                        fields={step.fields}
                                        inputChange={this.inputChange}
                                        state={this.state}
                                        next={this.next}
                                        prev={this.prev}
                                        totalSteps={steps.length}
                                        tryAgain={this.tryAgain}
                                        toStart={this.toStart}
                                        content={step.content}
                                    />
                                ))}
                            </Form>
                            <Gdpr agree={this.agreeGdpr} cancel={this.cancelGdpr} isModalOpen={this.state.gdprModalOpen}/>
                            <Terms agree={this.agreeTerms} cancel={this.cancelTerms} isModalOpen={this.state.termsModalOpen}/>
                        </Content>
                    </Route>
                )}
            </Market.Consumer>
        )
    }
}

export default withTracker(Publish)
