import division1 from '../../assets/images/division1.svg'
import division2 from '../../assets/images/division2.svg'
import division3 from '../../assets/images/division3.svg'
import division4 from '../../assets/images/division4.svg'
import division5 from '../../assets/images/division5.svg'
import division6 from '../../assets/images/division6.svg'

export const getDivisionPicture = division => {
    switch (division) {
        case 1:
            return division1
        case 2:
            return division2
        case 3:
            return division3
        case 4:
            return division4
        case 5:
            return division5
        case 6:
            return division6
        default:
            return division6
    }
}
