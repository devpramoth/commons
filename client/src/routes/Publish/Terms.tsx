import React, { PureComponent, ChangeEvent } from 'react'
import Modal from '../../components/atoms/Modal'
import styles from './Terms.module.scss'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Form/Input'

export default class Terms extends PureComponent<
    { agree: any, cancel: any, isModalOpen: boolean },
    { checked: string}
> {
    public state = {
        checked: ''
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        if(this.state.checked === ''){
            this.setState({
                checked: 'i-have-read-and-agree-to-the-terms-and-conditions'
            })
        }else{
            this.setState({
                checked: ''
            })
        }
    }

    public render() {
        return (
            <Modal
                title="Terms and conditions"
                description=""
                isOpen={this.props.isModalOpen}
                toggleModal={this.props.cancel}
            >
                <div className={styles.info}>
                    <div>
                        <div><h3>Your agreement</h3></div>
                        <div>
                        By using this site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.
                        </div>
                        <div><h3>Toxicity</h3></div>
                        <div>
                        You shall not use any product to advertise, sell, or exchange any products or services relating to illegal or illicit activities, including, without limitation, pornographic products or services, illegal drug products or services, or illegal weapons.
                        </div>
                        <div><h3>Sharing</h3></div>
                        <div>
                        The data recipient will not release data to a third party without prior approval from the data provider. The data recipient will not share, publish, or otherwise release any findings or conclusions derived from analysis of data obtained from the data provider without prior approval from the data provider.
                        </div>
                        <div><h3>Confidentiality</h3></div>
                        <div>
                        The Product, Customer Data, this Agreement, and any proprietary or confidential information, including but not limited to user IDs and passwords made available to Customer by BigchainDB in order to allow Customer access to BigchainDB's FTP servers (when applicable) to retrieve Product(s), (collectively, "Confidential Information") provided hereunder by one party ("Disclosing Party") to the other ("Receiving Party") shall be held in confidence by the Receiving Party and shall not be disclosed or used for any purpose other than as expressly provided in this Agreement without the prior written consent of the Disclosing Party. The Receiving Party shall: (a) protect the Confidential Information of the Disclosing Party with at least the same degree of care with which it protects its own confidential or proprietary information, but not less than a reasonable degree of care, and (b) instruct its employees and all other parties who are authorized to have access to the Disclosing Party's Confidential Information of the restrictions contained in this Agreement. Each Receiving Party shall limit access to the Disclosing Party's Confidential Information to its own employees, agents, contractors, Service Providers (as defined herein), and consultants strictly with a "need to know"; provided, however, that such parties have executed an agreement with the Receiving Party with confidentiality provisions at least as restrictive as those contained herein. The parties hereby undertake to ensure the individual compliance of such employees, agents, contractors, Service Providers and consultants with the terms hereof and shall be responsible for any actions of such employees, agents, contractors, Service Providers and consultants. Receiving Party shall, as soon as reasonably practical after discovery, report to the Disclosing Party any unauthorized use of, disclosure of or access to the Disclosing Party's Confidential Information, subject to any reasonable restrictions placed on the timing of such notice by a law enforcement or regulatory agency investigating the incident; and take all reasonable measures to prevent any further unauthorized disclosure or access.
                        </div>
                        <div><h3>Indemnification</h3></div>
                        <div>
                        Customer shall defend, indemnify and hold harmless BigchainDB from and against any and all claims, demands, judgments, liability, damages, losses, costs, and expenses, including reasonable attorneys' fees, arising out of or resulting from Customer's or its Client's or Third Party Service Provider's misuse or unauthorized use of the Product.
                        </div>
                        <div><h3>Warranty Disclaimer / Limitation of Liability</h3></div>
                        <div>
                        The Products may be subject to transcription and transmission errors, accordingly, the Products are provided on an "as is," "as available" basis. Any use or reliance upon the Product by Customer shall be at its own risk. EXCEPT AS SET FORTH IN THIS SECTION, NEITHER BigchainDB NOR THE DATA OWNER MAKES ANY WARRANTIES, EXPRESS OR IMPLIED, HEREUNDER WITH RESPECT TO THE SERVICES, DATA, OR THE MEDIA ON WHICH THE DATA IS PROVIDED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF ACCURACY, COMPLETENESS, CURRENTNESS, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. BigchainDB AND THE DATA OWNER'S AGGREGATE LIABILITY TO CUSTOMER OR ANY THIRD PARTY, WHETHER FOR NEGLIGENCE, BREACH OF WARRANTY, OR ANY OTHER CAUSE OF ACTION, SHALL BE LIMITED TO THE PRICE PAID FOR THE PRODUCT OR SERVICES TO WHICH THE INCIDENT RELATES. IN NO EVENT SHALL the COMPANY OR DATA OWNER BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES, WHETHER OR NOT FORESEEABLE AND HOWEVER ARISING, INCLUDING BUT NOT LIMITED TO LOST INCOME OR LOST REVENUE, WHETHER BASED IN CONTRACT, TORT OR ANY OTHER THEORY.
                        </div>
                        <div><h3>Audit / Non-Compliance</h3></div>
                        <div>
                        BigchainDB reserves the right to audit any and each of your computer systems and applicable business records to ensure your compliance with the terms and conditions of this Agreement. Similarly, BigchainDB may monitor your use of the Product. BigchainDB reserves the right, in its sole discretion, to immediately suspend your use of the Data in the event of any suspected or actual violation of the terms of this Agreement. In the event an audit reveals that you are not in compliance with the terms and conditions of this Agreement, you shall be responsible for the costs of the audit, as well as any and all damages resulting from such non-compliance including, without limitation, any special, incidental, indirect, or consequential damages whatsoever (including punitive damages and damages for loss of goodwill).
                        </div>
                        <div><h3>Third Party Processor</h3></div>
                        <div>
                        Customer may provide its own or its Client's file as enhanced with the Products to Customer's third party service bureau processor, mail house or marketing consultant (each a "Service Provider") who are performing services for Customer in connection with Customer's or its Client's use of the Products; provided that prior to delivery of the Products to the Service Provider, Customer shall have obtained the Service Provider's written agreement to: (a) hold the Products in strict confidence; (b) use the Products only in connection with such services; (c) not translate the Products into another format or language, or decompile or reverse engineer the Products, and (d) not sell, rent or otherwise provide the Products to any third party.
                        </div>
                        <div><h3>Communication</h3></div>
                        <div>
                        The parties may communicate with each other by electronic means. The parties agree to the following for all electronic communications: an identification code ("USERID") contained in or with an electronic document is legally sufficient to verify the sender's identity and the document's authenticity; an electronic document that is sent with or contains a USERID is a signed writing; and an electronic document, or any computer printout of it, is an original when maintained in the normal course of business.
                        </div>
                        <div><h3>Regulations</h3></div>
                        <div>
                        Both parties shall comply with all Federal and State laws and regulations governing the confidentiality of the information that is the subject of this Agreement.
                        </div>
                        <div><h3>Intended Use</h3></div>
                        <div>
                        BigchainDB reserves the right to review and pre-approve the Customer's intended use of the Product prior to BigchainDB's acceptance of an order.
                        </div>
                        <div><h3>Delivery of the Data</h3></div>
                        <div>
                        BigchainDB shall provide the Product via the Internet, or otherwise as the parties may agree. You acknowledge that certain mechanical or software failures may render the Internet or telecommunications link unavailable for periods of time and that BigchainDB may not be able to provide advance warning to you of such impending downtime. BigchainDB shall use reasonable efforts to provide you with advance notice of downtime.
                        </div>
                        <div><h3>Force Majeure</h3></div>
                        <div>
                        Neither party shall be liable for any losses arising out of the delay or interruption of its performance of obligations under the Agreement due to any act of God, act of governmental authority, act of public enemy, war, riot, flood, civil commotion, insurrection, severe weather conditions, or any other cause beyond the reasonable control of the party delayed.
                        </div>
                        <div>
                        By accessing and using this service, you accept and agree to be bound by the terms and conditions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </div>
                        <div>
                        These terms and conditions are subject to change.
                        </div>
                    </div>
                    <div>
                        <Input
                            name={"checked"}
                            label={""}
                            type={"checkbox"}
                            onChange={this.inputChange}
                            value={this.state.checked}
                            options={[
                                "I have read and agree to the terms and conditions"
                            ]}
                        />
                    </div>
                    <Button
                        onClick={this.props.agree}
                        disabled={this.state.checked === ''}
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
