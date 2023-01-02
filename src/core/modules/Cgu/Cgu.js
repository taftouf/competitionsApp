import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMobile } from '../../hooks/useMobile'
import { SvgSprite } from '../../ui/SvgSprite/SvgSprite'
// Styles
import styles from './index.module.scss'
import logo from '../../../assets/images/logo.png'

export const Cgu = () => {
    const isTablet = useMobile(1300)
    return (
        <div className={styles.pageWrapper}>
            <div className={cn({
                [styles.pageWrapperContent]:!isTablet,
                [styles.pageWrapperMobile]: isTablet
            })}>
                {!isTablet && (
                    <div className={styles.img}>
                        <img 
                            className={styles.banner}
                            src={logo}
                            alt="Ifc Banner"
                            />
                    </div>
                    )}
                    <div className={cn(styles.text,{
                    [styles.textMobile] : isTablet,
                    })}>
                        <div className={styles.header}>
                            <Link to={'/auth/login'} className={styles.matchArrowLink}>
                                <SvgSprite spriteID={'leftArrow'}/>
                            </Link>
                               Conditions générales d{"'"}utilisation
                        </div>
                        <div className={styles.body}>
                            <div className={styles.containerContent}>
                                <p className={styles.parag}>Dernière mise à jour : 23 Mai 2021</p>
                                <p className={styles.parag}>L{'’'}IFC développe une technologie et des services permettant d’optimiser l’expérience e-sport. Les présentes Conditions régissent votre utilisation de l{'’'}IFC. Nous ne vous facturons pas l’utilisation de l{'’'}IFC ou des autres produits et services inclus dans les présentes Conditions. Nous n’utilisons pas vos données personnelles à des fins commerciales.</p>
                                <h1 className={styles.headerI}>1. Les services que nous fournissons</h1>
                                <p className={styles.parag}>Notre mission consiste à donner à tous la possibilité de pouvoir participer à des événements e-sports (tournois, ligues). Pour faire avancer cette mission, nous vous fournissons les produits et les services décrits ci-dessous :</p>
                                <div>
                                    <p className={styles.parag}>
                                        Nous mettons en contact les joueurs e-sports : Nous aidons à trouver et à contacter les joueurs e-sport dans le cadre de tournois, ligues, organisation d’équipes…
                                    </p>
                                    <p className={styles.parag}>
                                        Nous mettons à disposition une technologie qui optimise l’expérience de tournoi : Nous aidons à organiser et mener à bien les tournois et ligues qui ont lieu sur la plateforme.
                                    </p>
                                    <p className={styles.parag}>
                                        Nous luttons contre les comportements préjudiciables : Nous nous efforçons de détecter et combattre les mauvaises utilisations de l{'’'}IFC, et les comportements préjudiciables envers les autres. Si la situation le nécessite, nous prendrons les mesures appropriées, par exemple en bloquant l’accès à certaines fonctionnalités, en désactivant un compte ou en contactant les autorités légales.
                                    </p> 
                                    <h1 className={styles.headerI}>2. Vos engagements envers l{'’'}IFC</h1>
                                    <h2 className={styles.headerII}>2.1 Qui peut utiliser l{'’'}IFC</h2>
                                    <p className={styles.parag}>Nous fournissons ces services à vous et à d’autres personnes pour faire progresser notre mission. En échange, nous avons besoin que vous preniez les engagements suivants :</p>
                                    <ol>
                                        <li className={styles.parag}>
                                        fournir des informations exactes à propos de vous
                                        </li>
                                        <li className={styles.parag}>
                                        ne pas partager votre mot de passe, autoriser d’autres personnes à accéder à votre compte IFC, ni transférer votre compte à quiconque (sans notre autorisation).
                                        </li>
                                    </ol>
                                    <p className={styles.parag}>Nous essayons de rendre l{'’'}IFC largement accessible à tous, mais vous ne pouvez pas utiliser l{'’'}IFC si :</p>
                                    <ol>
                                        <li className={styles.parag}>vous avez moins de 13 ans</li>
                                        <li className={styles.parag}>nous avons précédemment désactivé votre compte pour non-respect de nos Conditions générales ou de nos Règlements</li>
                                        <li className={styles.parag}>vous n’êtes pas autorisé(e) à utiliser notre service en vertu des lois applicables.</li>
                                    </ol>
                                    <h2 className={styles.headerII}>2.2 Ce que vous pouvez partager et faire sur l{'’'}IFC</h2>
                                    <p className={styles.parag}>Nous voulons que les gens utilisent l{'’'}IFC dans le cadre récréatif de l’e-sport mais pas au détriment de la sécurité et du bien-être des autres ou de l’intégrité de notre communauté. Vous acceptez donc de ne pas agir de la manière décrite ci-dessous (ni d’encourager ou de soutenir les autres à le faire) :</p>
                                    <p className={styles.parag}>
                                    Vous ne pouvez pas utiliser notre service ou partager quoi que ce soit
                                    </p>
                                    <ol>
                                        <li className={styles.parag}>qui enfreint les présentes conditions</li>
                                        <li className={styles.parag}>qui est illégal (organisation de tournois e-sport payants pour les participants), trompeur, discriminant ou frauduleux</li>
                                        <li className={styles.parag}>qui enfreint ou viole des droits tiers, y compris des droits de propriété intellectuelle.</li>
                                    </ol>
                                    <p className={styles.parag}>Vous ne pouvez pas importer de virus ou de code malveillant ni agir d’une manière qui pourrait désactiver, surcharger ou empêcher le bon fonctionnement ou l’apparence de notre service. </p>
                                    <p className={styles.parag}>Vous ne pouvez pas collecter des données sur notre service ni accéder à de telles données par des moyens automatisés (sans autorisation préalable), ni tenter d’accéder à des données auxquelles vous n’êtes pas autorisé(e) à accéder.</p>
                                    <p className={styles.parag}>Nous pouvons supprimer ou bloquer le contenu qui enfreint ces dispositions. Si nous supprimons du contenu que vous avez partagé, car il viole nos Standards de la communauté, nous vous en informerons et vous expliquerons les options à votre disposition pour demander un réexamen, à moins que vous n’enfreigniez gravement ou à maintes reprises les présentes Conditions ou si cela engage notre responsabilité juridique ou celle d’un tiers, porte atteinte à notre communauté d{"’"}utilisateurs, ou compromette ou altère l’intégrité ou le fonctionnement de nos services, systèmes ou Produits, ou en cas de restrictions techniques ou lorsqu{"'"}il nous est interdit de le faire pour des raisons légales.</p>
                                    <h2 className={styles.headerII}>2.3 Les autorisations que vous nous accordez</h2>
                                    <p className={styles.parag}>Le contenu que vous partagez ou importez peut être protégé par des droits de propriété intellectuelle.</p>
                                    <p className={styles.parag}>Vous possédez les droits de propriété intellectuelle (tels que les droits d’auteur et les marques déposées) de tout le contenu que vous créez et partagez sur l{'’'}IFC. Aucune disposition des présentes Conditions ne vous prive des droits que vous possédez sur votre propre contenu. Vous êtes libre de partager votre contenu avec quiconque, où vous le souhaitez</p>
                                    <p className={styles.parag}>Cependant, afin que nous puissions fournir notre service, vous devez nous accorder certaines autorisations légales (appelées « licences ») pour utiliser ce contenu. Ceci est uniquement dans le but de fournir et d’améliorer notre service, tels que décrits dans la Section 1 ci-dessus.</p>
                                    <p className={styles.parag}>Vous pouvez supprimer votre contenu individuellement ou tout d’un coup en supprimant votre compte.</p>
                                    <h1 className={styles.headerI}>3. Dispositions supplémentaires</h1>
                                    <h2 className={styles.headerII}>3.1 Mise à jour de nos Conditions</h2>
                                    <p className={styles.parag}>Nous nous efforçons d’améliorer constamment notre service. Ainsi, nous sommes susceptibles de mettre à jour les présentes Conditions de temps à autre afin de refléter correctement notre service et nos pratiques. Nous les modifierons uniquement si les dispositions ne sont plus adéquates ou si elles sont incomplètes, et si les modifications sont raisonnables et prennent bien en compte vos intérêts.</p>
                                    <h2 className={styles.headerII}>3.2 Suspension ou résiliation d’un compte</h2>
                                    <p className={styles.parag}>S’il s’avère que vous avez manifestement, gravement ou à maintes reprises enfreint nos Conditions, nous pourrons suspendre ou désactiver définitivement l’accès à votre compte. Nous pourrons également suspendre ou désactiver votre compte si vous enfreignez à plusieurs reprises des droits de propriété intellectuelle tiers ou si la loi nous y oblige.</p>
                                    <h2 className={styles.headerII}>3.3 Limites de responsabilité</h2>
                                    <p className={styles.parag}>
                                    Nous ferons preuve de diligence professionnelle pour vous fournir notre service, et maintenir un environnement sûr et sans erreurs. Sous réserve d’avoir agi avec diligence professionnelle, nous n’acceptons aucune responsabilité en cas de pertes non dues à notre violation des présentes Conditions ou à tout autre acte de notre part ; de pertes raisonnablement imprévisibles par vous ou nous lors de la conclusion des présentes Conditions ; et d’évènements en dehors de notre contrôle raisonnable.
                                    </p>
                                    <h1 className={styles.headerI}>Nous contacter</h1>
                                    <div><span className={styles.parag}>Pour toute question au sujet de ces Conditions d{"'"}Utilisation, vous pouvez nous contacter par mail: </span>
                                        <a href="mailto:contact@the-ifc.com"> contact@the-ifc.com.</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        
    )
}
