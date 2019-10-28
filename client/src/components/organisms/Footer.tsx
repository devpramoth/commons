import React, { useContext } from 'react'
import { Market, User } from '../../context'
import Content from '../atoms/Content'
import { ReactComponent as AiCommons } from '../../img/aicommons.svg'
import styles from './Footer.module.scss'

import meta from '../../data/meta.json'
import VersionNumbers from '../molecules/VersionNumbers'

export default function Footer() {
    const market = useContext(Market)
    const user = useContext(User)

    return (
        <footer className={styles.footer}>
            <aside className={styles.stats}>
                <Content wide>
                    <p className={styles.aicommons}>
                        Proud supporter of{' '}
                        <a
                            href="https://aicommons.com/?utm_source=commons.oceanprotocol.com"
                            title="AI Commons"
                        >
                            <AiCommons />
                        </a>
                    </p>
                    <p className={styles.byoceanprotocol}>
                        Powered by{' '}
                        <a
                            href="https://oceanprotocol.com/"
                            title="Ocean Protocol"
                        >
                            Ocean Protocol
                        </a>
                    </p>
                </Content>
            </aside>

            <Content wide>
                <small>
                    &copy; {new Date().getFullYear()}{' '}
                    Ocean Pro Market &mdash; All
                    Rights Reserved
                </small>

                <nav className={styles.links}>
                    {meta.social.map(site => (
                        <a key={site.title} href={site.url}>
                            {site.title}
                        </a>
                    ))}
                </nav>
            </Content>
        </footer>
    )
}
