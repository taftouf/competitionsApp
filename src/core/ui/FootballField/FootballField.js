import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

//image
import footFeild from '../../../assets/images/footField.svg'
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const FootballField = ({initValue, setNewValue}) => {
    const [value, setValue] = useState(initValue)
    
    useEffect(()=>{
        if(value != initValue){
            setNewValue(value)
        }
    }, [value])
    return (
        <div className={styles.wrapper}>
            <div className={styles.campo}>
                <img src={footFeild} />          
                {/* Attack */}
                <div className={styles.bu2}>
                    <div className={styles.bu2Text} onClick={()=>setValue(17)} >
                        BU
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 17})}/>
                </div>
                <div className={styles.avd}>
                    <div className={styles.avdText} onClick={()=>setValue(14)} >
                        AVD
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 14})}/>
                </div>
                <div className={styles.bu1}>
                    <div className={styles.bu1Text} onClick={()=>setValue(15)} >
                        BU
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 15})}/>
                </div>
                <div className={styles.avg}>
                    <div className={styles.avgText} onClick={()=>setValue(16)} >
                        AVG
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 16})}/>
                </div>
                <div className={styles.ad}>
                    <div className={styles.adText} onClick={()=>setValue(12)} >
                        AD
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 12})}/>
                </div>
                <div className={styles.ag}>
                    <div className={styles.agText} onClick={()=>setValue(13)} >
                        AG
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.blueAtt] : value === 13})}/>
                </div>

                {/* M */}

                <div className={styles.moc}>
                    <div className={styles.mocText} onClick={()=>setValue(11)} >
                        MOC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 11})}/>
                </div>
                <div className={styles.md}>
                    <div className={styles.mdText} onClick={()=>setValue(8)} >
                        MD
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 8})}/>
                </div>
                <div className={styles.mc2}>
                    <div className={styles.mc2Text} onClick={()=>setValue(19)} >
                        MC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 19})}/>
                </div>
                <div className={styles.mc1}>
                    <div className={styles.mc1Text} onClick={()=>setValue(9)} >
                        MC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 9})}/>
                </div>
                <div className={styles.mg}>
                    <div className={styles.mgText} onClick={()=>setValue(10)} >
                        MG
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 10})}/>
                </div>
                <div className={styles.mdc}>
                    <div className={styles.mdcText} onClick={()=>setValue(6)} >
                        MDC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.greenCenter] : value === 6})}/>
                </div>

                {/* D */}
                <div className={styles.dld}>
                    <div className={styles.dldText} onClick={()=>setValue(5)} >
                        DLD
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 5})}/>
                </div>

                <div className={styles.dlg}>
                    <div className={styles.dlgText} onClick={()=>setValue(7)} >
                        DLG
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 7})}/>
                </div>

                <div className={styles.dd}>
                    <div className={styles.ddText} onClick={()=>setValue(2)} >
                        DD
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 2})}/>
                </div>

                <div className={styles.dc2}>
                    <div className={styles.dc2Text} onClick={()=>setValue(18)} >
                        DC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 18})}/>
                </div>

                <div className={styles.dc1}>
                    <div className={styles.dc1Text} onClick={()=>setValue(3)} >
                        DC
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 3})}/>
                </div>

                <div className={styles.dg}>
                    <div className={styles.dgText} onClick={()=>setValue(4)} >
                        DG
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 4})}/>
                </div>

                <div className={styles.gk}>
                    <div className={styles.gkText} onClick={()=>setValue(1)} >
                        G
                    </div>  
                    <SvgSprite spriteID={'lineMatch'} className={cn({[styles.redDeff] : value === 1})}/>
                </div>
            </div>
        </div>
    )
}
