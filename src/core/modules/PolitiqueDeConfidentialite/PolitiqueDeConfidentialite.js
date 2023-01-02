import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMobile } from '../../hooks/useMobile'
import { SvgSprite } from '../../ui/SvgSprite/SvgSprite'
// Styles
import styles from './index.module.scss'
import logo from '../../../assets/images/logo.png'

export const PolitiqueDeConfidentialite = () => {
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
                            alt="Ifc Banner" />
                    </div>
                    )}
                    <div className={cn(styles.text,{
                    [styles.textMobile] : isTablet,
                    })}>
                        <div className={styles.header}>
                            <Link to={'/auth/login'} className={styles.matchArrowLink}>
                                <SvgSprite spriteID={'leftArrow'}/>
                            </Link>
                            Politique de confidentialité
                            
                        </div>
                        <div className={styles.body}>
                            <div className={styles.containerContent}>
                                <p className={styles.parag}>Dernière mise à jour : 23 Mai 2021</p>
                                <p className={styles.parag}>La Politique de Confidentialité décrit la manière dont Nous collectons et utilisons Vos données lorsque Vous utilisez Notre Service, ainsi que Vos droits concernant Vos données personnelles et la façon dont la loi Vous protège.</p>
                                <p className={styles.parag}>Nous utilisons Vos données personnelles pour fournir et améliorer Notre Service. En utilisant Notre Service, Vous acceptez que Vos données soient collectées et utilisées en accord avec cette Politique de Confidentialité.</p>
                                <h1 className={styles.headerI}>1. Interprétation et définitions</h1>
                                <h2  className={styles.headerII}>1.1 Interprétation</h2>
                                <p className={styles.parag}>Les mots dont la première lettre est en majuscule ont un sens défini ci-dessous. Ces définitions s’appliqueront, que les termes concernés soient au singulier ou au pluriel.</p>
                                <h2  className={styles.headerII}>1.2 Définitions</h2>
                                <p className={styles.parag}>Aux fins de cette Politique de Confidentialité :</p>
                                <p className={styles.parag}><b>Vous</b> (qui inclut les termes « Vos » et « Votre ») renvoie à l’individu qui a accès ou qui utilise le Service, ou la société ou tout autre entité légale au nom de laquelle l’individu en question utilise le Service. Conformément à la RGPD (Règlement Général sur la Protection des Données), nous pouvons nous référer à Vous comme le Data Subject ou l’Utilisateur étant donné que Vous êtes l’individu qui utilise le Service.</p>
                                <p className={styles.parag}><b>Société</b> (qui inclut les termes « la Société » « Nous », « Nos », « Notre » dans cet accord) renvoie à l’IFC. Dans le cadre du RGPD, la Société est le Contrôleur de Données.</p>
                                <p className={styles.parag}><b>Affilié</b> renvoie à une entité qui contrôle, est contrôlée par, ou est sous contrôle conjoint avec un tiers, où le terme « contrôle » renvoie à la possession de 50% ou plus des actions, du pourcentage de participation ou autres garanties qui permettent de participer à l’élection de l’organe de direction et autres autorités de gestion.</p>
                                <p className={styles.parag}><b>Compte</b> renvoie à l’unique compte créé pour Vous afin d’accéder à Notre Service ou parties de Notre Service.</p>
                                <p className={styles.parag}><b>Site</b> internet renvoie à l’IFC, accessible à partir de l’URL <a href="https://the-ifc.fr/" rel={'noreferrer'} target={'_blank'}><u>https://the-ifc.fr</u></a>.</p>
                                <p className={styles.parag}><b>Service</b> renvoie au site internet.</p>
                                <p className={styles.parag}><b>Pays</b> renvoie à la France.</p>
                                <p className={styles.parag}><b>Fournisseur</b> du Service renvoie à toute personne physique ou morale qui traite la data au nom de la Société. Cela renvoie aux société tierces ou aux individus employés par la Société pour faciliter l’accès au service, pour fournir le Service au nom de la Société, pour développer de nouveaux services liés au Service ou pour aider la Société à analyser la façon dont le Service est utilisé. Conformément au RGPD, les Fournisseurs de Service sont considérés comme étant les Processeurs de Données.</p>
                                <p className={styles.parag}><b>Réseau social tiers</b>  renvoie à tout site internet ou réseau social à partir duquel l’Utilisateur peut se connecter ou créer un compte pour utiliser le Service.</p>
                                <p className={styles.parag}><b>Données Personnelles</b>  renvoie à toute information relative à un individu identifié ou identifiable. Conformément au RGPD, les Données Personnelles renvoient à toutes les informations qui Vous sont propres, comme le nom, un numéro d’identification, une localisation, un identifiant, ou à un ou plusieurs facteurs spécifiques à l’identité physique, psychologique, génétique, mentale, économique, culturelle ou sociale.</p>
                                <p className={styles.parag}><b>Cookies</b> renvoie aux petits fichiers placés par un site internet sur Votre ordinateur, téléphone ou tout autre appareil, et qui contient les détails de Votre historique de navigation sur ce site internet lors de ses multiples utilisations.</p>
                                <p className={styles.parag}><b>Appareil</b> renvoie à tout appareil sur lequel il est possible d’accéder au Service, tel qu’un ordinateur, un téléphone portable, ou une tablette.</p>
                                <p className={styles.parag}><b>Données d{"'"}Usage</b> renvoie aux données collectées automatiquement, générées soit par l’utilisation du Service, soit par l’infrastructure du Service lui-même (par exemple, le temps de visite d’une page web).</p>
                                <p className={styles.parag}><b>Contrôleur de Données</b> conformément au RGPD, renvoie à la Société comme la personne morale qui, seule ou en accord avec d’autres, détermine les finalités et les moyens liés à la collecte des Données Personnelles.</p>
                                
                                <h1 className={styles.headerI}>2. Collecter et utiliser Vos Données Personnelles</h1>
                                <h2  className={styles.headerII}>2.1 Type de Données collectées</h2>
                                <p className={styles.parag}><b>Données Personnelles</b></p>
                                <p className={styles.parag}>Lorsque Vous utilisez Notre service, Nous sommes susceptibles de Vous demander de Nous fournir certains renseignements personnels, qui peuvent être utilisés pour Vous identifier ou Vous contacter. Ces renseignements personnels peuvent inclure, sans s’y limiter :</p>
                                <ul>
                                    <li className={styles.parag}>L’adresse email</li>
                                    <li className={styles.parag}>Le prénom et le nom de famille</li>
                                    <li className={styles.parag}>Les Données d’Usage</li>
                                </ul>
                                <p className={styles.parag}><b>Les Données d{"'"}Usage</b></p>
                                <p className={styles.parag}>Les Données d’Usage sont automatiquement collectées lorsque Vous utilisez le Service.</p>
                                <p className={styles.parag}>Les Données d’Usage peuvent inclure des informations comme votre adresse IP (Internet Protocol), le type et la version de votre navigateur, les pages de Notre Service que Vous visitez, la date et l’heure de Votre visite, le temps passé sur ces pages, les Unique Device Identifiers (UDI) et autres données de fonctionnement.</p>
                                <p className={styles.parag}>Lorsque Vous accédez au Service avec un téléphone portable, Nous sommes susceptibles de collecter automatiquement certaines informations, incluant sans s’y limiter, le type d’appareil que Vous utilisez, Votre ID d’appareil mobile, l’adresse IP, le système d’exploitation, et le type de navigateur Internet de votre appareil mobile, les Unique Device Identifiers (UDI) et autres données de fonctionnement.</p>
                                <p className={styles.parag}>Nous sommes aussi susceptibles de collecter les informations que votre navigateur envoie lorsque Vous visitez Notre Service ou lorsque Vous accéder au Service à l’aide d’un téléphone mobile.</p>
                                <p className={styles.parag}><b>Technologies de suivi et Cookie</b></p>
                                <p className={styles.parag}>Nous utilisons des Cookies et des technologies de suivi similaires pour suivre l’activité sur Notre Service et conserver certaines informations. Les technologies de suivi utilisées sont les beacons, les tags et les scripts pour collecter, suivre les informations et améliorer et analyser Notre Service.</p>
                                <p className={styles.parag}>Vous pouvez demander à Votre navigateur de refuser tous les Cookies ou de Vous notifier lorsqu’un Cookie est envoyé. Cependant, si Vous n’acceptez pas les Cookies, il est possible que Vous ne puissiez pas utiliser certaines options de Notre Service.</p>
                                <p className={styles.parag}>Les Cookies peuvent être « Persistants » ou « de Session ». Les Cookies Persistants restent sur votre ordinateur personnel ou votre appareil mobile lorsque vous vous déconnectez, alors que les Cookies de Session sont supprimés dès que vous fermez votre navigateur web.</p>
                                <p className={styles.parag}>Nous utilisons à la fois des Cookies de Session et des Cookies Persistants pour les raisons indiquées ci-dessous :</p>
                                <p className={styles.parag}><b>Cookies Nécessaires/Essentiels</b></p>
                                <p className={styles.parag}>Type : Cookie de Session</p>
                                <p className={styles.parag}>Géré par : Nous</p>
                                <p className={styles.parag}>But : Ces Cookies sont essentiels pour vous fournir les services disponibles sur le Site Internet et pour Vous permettre d’utiliser certaines de ses fonctionnalités. Ils permettent d’identifier les utilisateurs et combattre une utilisation frauduleuse de comptes utilisateurs. Sans ces Cookies, les services que Vous avez demandés ne pourront pas être fournis, et Nous utilisons ces Cookies uniquement pour Vous fournir ces services.</p>
                                <p className={styles.parag}>Pour plus d’informations à propos des Cookies que Nous utilisons et de Vos choix concernant les Cookies, merci de lire Notre Politique de Cookies ou la section Cookies de Notre Politique de Confidentialité.</p>
                                <h2  className={styles.headerII}>
                                2.2 Utilisation de Vos Données Personnelles
                                </h2>
                                <p className={styles.parag}>La Société est susceptible d’utiliser les Données Personnelles pour les raisons suivantes:</p>

                                <ol>
                                    <li className={styles.parag}>Fournir et entretenir Notre Service, ainsi qu’en suivre et en contrôler l’utilisation.</li>
                                    <li className={styles.parag}>Gérer Votre compte : gérer Votre inscription en tant qu’utilisateur du Service. Les Données Personnelles que Vous fournissez peuvent vous donner accès à différentes fonctionnalités du Service qui Vous sont accessibles en tant qu’utilisateur enregistré.</li>
                                    <li className={styles.parag}>Assurer la bonne exécution d’un contrat : la mise en œuvre, la conformité et la promesse du contrat d’achat pour les produits, items ou services que Vous avez achetés, ou de tout autre contrat avec Nous à travers le Service.</li>
                                    <li className={styles.parag}>Vous contacter : pour Vous contacter par mail, appel téléphonique, SMS ou autre forme de communication électronique, comme des notifications push d’application mobile. Nous sommes susceptibles de Vous contacter pour Vous informer des mises à jour, Vous transmettre des informations liées aux fonctionnalités, aux produits et aux services, incluant les mises à jour de sécurité.</li>
                                    <li className={styles.parag}>Pour gérer Vos requêtes : pour suivre et gérer Vos requêtes qui Nous sont destinées.</li>
                                </ol>
                                <p className={styles.parag}>Nous sommes susceptibles de partager Vos informations personnelles dans les situations suivantes: </p>
                                <ol>
                                    <li className={styles.parag}>Dans le cas de transfert d’entreprise : Nous sommes susceptibles de partager ou transférer Vos informations personnelles dans le cadre de, ou au cours des négociations pour toute fusion, vente d’actifs de l’Entreprise, financement, ou acquisition d’une partie ou de l’intégralité de Notre Société par une autre société.</li>
                                    <li className={styles.parag}>Avec des filiales : Nous sommes susceptibles de partager Vos informations avec Nos filiales, auquel cas ces filiales devront honorer cette Politique de Confidentialité. Les filiales incluent la maison mère, ainsi que tout autre entreprise filiale, joint-venture et autre entreprise que Nous contrôlons ou qui est sous contrôle commun avec Nous.</li>
                                    <li className={styles.parag}>Avec d’autres utilisateurs : lorsque Vous partagez Vos informations personnelles ou interagissez dans l’espace public avec d’autres utilisateurs, ces informations personnelles peuvent être vues par tous les utilisateurs et peuvent être publiquement distribuées à l’extérieur du Service. Si Vous interagissez avec d’autres utilisateurs ou Vous inscrivez par l’intermédiaire d’un Réseau Social Tiers, Vos contacts sur le Réseau Social Tiers sont susceptibles de voir Votre nom, profile, photos et description de Votre activité. De la même façon, les autres utilisateurs pourront voir les descriptions de Votre activité, communiquer avec Vous et voir Votre profil.</li>
                                </ol>
                                <h2>2.3 Conservation de Vos Données Personnelles</h2>
                                <p className={styles.parag}>La Société conserve Vos Données Personnelles aussi longtemps que nécessaire, et ce dans le seul but de répondre aux besoins décrits dans cette Politique de Confidentialité. Nous conservons et utilisons Vos Données Personnelles pour remplir nos obligations légales (par exemple pour se conformer aux lois en vigueur), résoudre des litiges, et appliquer nos accords juridiques et nos politiques.</p>
                                <p className={styles.parag}>La Société conserve aussi les Données d’Usage à des fins d’analyses internes. Les Données d’Usage sont habituellement conservées pour une période plus courte, sauf lorsque ces données sont utilisées pour renforcer la sécurité ou pour améliorer la fonctionnalité de Nos Service, ou si Nous sommes légalement contraints de conserver ces données plus longtemps.</p>
                                <h2>2.4 Transfert de Vos Données Personnelles</h2>
                
                                <p className={styles.parag}>Vos informations, incluant vos Données Personnelles, sont gérées dans les bureaux opérationnels de la Société et dans tout autre lieu où les parties impliquées dans la gestion de ces donnés sont situées. Cela signifie que ces informations peuvent être transférées – et maintenues – vers des ordinateurs situés en dehors de Votre état, région, pays ou tout autre juridiction gouvernementale où les lois sur la protection des données sont susceptibles de différer de celles de Votre juridiction.</p>
                                <p className={styles.parag}>En consentant à cette Politique de Confidentialité et en Nous soumettant de telles informations, Vous acceptez ce transfert.</p>
                                <p className={styles.parag}>La Société fera tout le nécessaire pour s’assurer que vos Données Personnelles sont traitées de façon sécurisée et en accord avec cette Politique de Confidentialité. Aucun transfert de Vos Données Personnelles n’aura lieu vers une organisation ou un pays qui n’assure pas un contrôle adéquat concernant la sécurité de Vos Données Personnelles et autres informations personnelles.</p>
                                <h2>2.5 Diffusion de Vos Données Personnelles</h2>
                                <p className={styles.parag}><b>Transactions commerciales</b></p>
                                <p className={styles.parag}>Si la Société est impliquée dans une fusion, acquisition, ou vente d’actifs, Vos Données Personnelles sont susceptibles d’être transférées. Nous vous informerons avant que Vos Données Personnelles ne soient transférées et deviennent sujettes à une Politique de Confidentialité différente.</p>
                                <p className={styles.parag}><b>Respect des lois</b></p>
                                <p className={styles.parag}>Dans certaines circonstances, il peut être demandé à la Société de révéler Vos Données Personnelles si la loi le demande, ou en réponse à des demandes valides venant d’autorités publiques (un tribunal ou une agence gouvernementale).</p>
                                <p className={styles.parag}><b>Autres exigences légales</b></p>
                                <p className={styles.parag}>La Société est susceptible de révéler Vos Données Personnelles si une telle action apparait de bonne foi et nécessaire à :</p>
                                <ol>
                                    <li className={styles.parag}>La conformité à des obligations légales</li>
                                    <li className={styles.parag}>La protection et la défense des droits et de la propriété de la Société</li>
                                    <li className={styles.parag}>Prévenir et enquêter sur une potentielle utilisation du Service à des fins répréhensibles</li>
                                    <li className={styles.parag}>Assurer la protection des Utilisateurs du Service ou du public</li>
                                    <li className={styles.parag}>Assurer une protection en matière de responsabilité civile</li>
                                </ol>
                                <h2>2.6 Sécurité de Vos Données Personnelles</h2>
                                <p className={styles.parag}>La sécurité de Vos Données Personnelles est très importante pour Nous, mais gardez en tête qu’aucune méthode de transmission par Internet ou de stockage électronique n’est 100% sécurisée. Bien que Nous fassions le maximum pour protéger Vos Données Personnelles, Nous ne pouvons pas garantir son absolue sécurité.</p>
                                <h1  className={styles.headerI}>3. Politique en matière de RGPD</h1>
                                <h2  className={styles.headerII}>3.1 Base légale pour traiter les Données Personnelles dans le cadre du RGPD</h2>
                                <p className={styles.parag}>Nous sommes susceptibles d’utiliser les Données Personnelles sous les conditions suivantes :</p>
                                <ol>
                                    <li className={styles.parag}>Consentement : Vous devez nous avoir accordé Votre consentement pour que Nous puissions utiliser Vos Données Personnelles dans un ou plusieurs buts définis.</li>
                                    <li className={styles.parag}>Assurer la bonne exécution d’un contrat : il est nécessaire de Nous fournir certaines Données Personnelles pour permettre la bonne exécution d’un accord entre Vous et Nous, et/ou pour toute obligation précontractuelle.</li>
                                    <li className={styles.parag}>Obligations légales : le traitement des Données Personnelles est nécessaire pour respecter certaines obligations légales auxquelles la Société est soumise.</li>
                                    <li className={styles.parag}>Intérêts vitaux : le traitement des Données Personnelles est nécessaire pour protéger Vos intérêts vitaux ainsi que ceux d’autres personnes.</li>
                                    <li className={styles.parag}>Intérêts généraux : le traitement des Données Personnelles se fait dans le respect de l’intérêt général ou dans le cadre de l’exercice d’une autorité officielle au sein de la Société.</li>
                                    <li className={styles.parag}>Intérêts légitimes : le traitement des Données Personnelles est nécessaire à la Société pour atteindre ses intérêts légitimes.</li>
                                </ol>
                                <p className={styles.parag}>Dans tous les cas, la Société se fera un plaisir de vous clarifier la base juridique qui s’applique dans ce processus spécifique.</p>
                                <h2  className={styles.headerII}>3.2 Vos Droits dans le cadre du RGPD</h2>
                                <p className={styles.parag}>La Société s’engage à respecter la confidentialité de Vos Données Personnelles et à Vous garantir que Vous pouvez exercer Vos droits.</p>
                                <p className={styles.parag}>D’après cette Politique de Confidentialité, et conformément à la loi si vous vivez dans l’Union Européenne, vous avez le droit de :</p>
                                <ol>
                                    <li className={styles.parag}>Demander d’accéder à vos Données Personnelles : le droit d’accéder, de mettre à jour ou de supprimer les informations que Nous avons sur Vous. Lorsque cela est possible, vous pouvez accéder, mettre à jour ou demander la suppression de vos Données Personnelles directement depuis la section Réglage de Votre compte. Si Vous ne parvenez pas à effectuer cela vous-même, n’hésitez pas à Nous contacter pour que Nous vous aidions. Cela Vous permet aussi de recevoir une copie des Données Personnelles que Nous avons sur Vous.</li>
                                    <li className={styles.parag}>Demander à corriger les Données Personnelles que nous avons sur vous : Vous avez le droit de faire corriger toute information incomplète ou incorrecte que Nous avons sur Vous.</li>
                                    <li className={styles.parag}>Protester contre l’utilisation de Vos Données Personnelles : ce droit existe lorsque nous reposons sur un intérêt légitime comme base légale à un certain stade de Notre processus de traitement de vos données et qu’il y a quelque chose qui, dans Votre situation, Vous pousse à protester contre l’utilisation de Vos Données Personnelles à ce stade précis. Vous avez aussi le droit de protester contre l’utilisation de Vos Données Personnelles à des fins marketing.</li>
                                    <li className={styles.parag}>Demander la suppression de Vos Données Personnelles : Vous avez le droit de Nous demander de supprimer ou de retirer Vos Données Personnelles lorsque Nous n’avons pas de bonne raison pour continuer à les utiliser.</li>
                                    <li className={styles.parag}>Demander le transfert de Vos Données Personnelles : Nous vous restituerons à Vous, ou un tiers que Vous aurez choisi, Vos Données Personnelles dans un format structuré et intelligible pour une machine. Veuillez noter que ce droit s’applique uniquement aux informations automatisées dont Vous Nous avez préalablement autorisé l’utilisation et aux informations que Vous Nous avez fournies pour établir un contrat avec Vous.</li>
                                    <li className={styles.parag}>Retirer son consentement : Vous avez le droit de retirer Votre consentement lié à l’utilisation de Vos Données Personnelles. Si Vous retirer Votre consentement, Nous ne seront plus en mesure de Vous assurer l’accès à certaines fonctionnalités du Service.</li>
                                </ol>
                                <h2  className={styles.headerII}>3.3 Exercer Vos Droits RGPD à la Protection des Données</h2>
                                <p className={styles.parag}>Vous pouvez exercer Vos droits d’accès, de rectification, de suppression ou d’opposition en Nous contactant. Veuillez noter que Nous sommes susceptibles de Vous demander de confirmer Votre identité avant de répondre à ce type de demandes. Si vous effectuez de telles demandes, sachez que Nous ferons de Notre maximum pour Vous répondre au plus vite.</p>
                                <p className={styles.parag}>Vous avez le droit de Vous plaindre auprès d’une Autorité de Protection des Données au sujet de Notre façon de collecter et d’utiliser Vos Données Personnelles. Pour plus d’informations, si vous vivez dans l’Espace Économique Européen (EEE), veuillez contacter Votre autorité de protection des données locale au sein de l’EEE.</p>
                                <h1  className={styles.headerI}>4. Liens vers d’autres sites</h1>
                                <p className={styles.parag}>Notre Service est susceptible de contenir des liens vers d’autres sites qui ne sont pas gérés par Nous. Si Vous cliquez sur un lien tiers, Vous serez redirigé vers le site de ce tiers. Nous vous recommandons fortement de porter à votre connaissance la Politique de Confidentialité de tous les sites que vous visitez.</p>
                                <p className={styles.parag}>Nous n’avons aucun contrôle sur ces sites, et ne sommes pas responsables du contenu, des politiques de confidentialité ou des pratiques de tout site ou service tiers.</p>
                                <h1  className={styles.headerI}>5. Changement dans cette Politique de Confidentialité</h1>
                                <p className={styles.parag}>Nous sommes susceptibles de mettre régulièrement à jour Notre Politique de Confidentialité. Nous Vous informerons de tout changement en postant la nouvelle Politique de Confidentialité sur cette page.</p>
                                <p className={styles.parag}>Nous Vous en informerons par email et/ou par notification visible sur Notre Service, avant que le changement soit effectif, et mettrons à jour la date de la « Dernière mise à jour » en première page de cette Politique de Confidentialité.</p>
                                <p className={styles.parag}>Nous Vous conseillons de lire régulièrement cette Politique de Confidentialité pour Vous informer des modifications. Les changements au sein de cette Politique de Confidentialité deviennent effectifs une fois postés sur cette page.</p>
                                <h1 className={styles.headerI}>Nous contacter</h1>
                                <div><span className={styles.parag}>Pour toute question au sujet de ces Conditions d{"'"}Utilisation, vous pouvez nous contacter par mail: </span>
                                    <a href="mailto:contact@the-ifc.com"><u>contact@the-ifc.com</u></a>.
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
           
        </div>
    )
}
