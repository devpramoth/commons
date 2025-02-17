import React, { PureComponent, ChangeEvent } from 'react'
import Modal from '../../components/atoms/Modal'
import styles from './Gdpr.module.scss'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Form/Input'

export default class Gdpr extends PureComponent<
    { agree: any, cancel: any, isModalOpen: boolean },
    { checked: string[] }
> {
    public state = {
        checked: []
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.currentTarget.value
        let checked: any[] = this.state.checked.slice()
        const index = checked.indexOf(value)
        if(index !== -1){
            checked.splice(index, 1);
        } else {
            checked.push(value)
        }
        this.setState({ checked })
    }

    public render() {
        return (
            <Modal
                title="GDPR Compliance"
                description=""
                isOpen={this.props.isModalOpen}
                toggleModal={this.props.cancel}
            >
                <div className={styles.info}>
                    <div>
                        We have noticed your offer contains personal data or anonymised personal data. We hold the right to take down your published offers incase of violation of the GDPR guidelines.
                    </div>
                    <div>
                        PLEASE ENSURE YOU HAVE TAKEN THE RIGHT MEASURES TO COMPLY WITH THE GDPR REGULATIONS. Please go through these checklists ensures you comply with the regulations.
                    </div>
                    <div>
                        <Button link href="https://gdpr.eu/checklist/" target="_blank">
                            https://gdpr.eu/checklist/
                        </Button>
                    </div>
                    <div>
                        <Button link href="https://gdpr.eu/data-processing-agreement/" target="_blank">
                            https://gdpr.eu/data-processing-agreement/
                        </Button>
                    </div>
                    <div>
                        <Input
                            name={"checked"}
                            label={""}
                            type={"checkbox"}
                            onChange={this.inputChange}
                            value={this.state.checked}
                            options={[
                                "My offer complies with GDPR regulations",
                                "I have copyrights to publish this data"
                            ]}
                        />
                    </div>
                    <Button
                        onClick={this.props.agree}
                        disabled={this.state.checked.length !== 2}
                        type={"button"}
                        primary
                    >
                        Agree
                    </Button>

                </div>
            </Modal>
        )
    }
}
