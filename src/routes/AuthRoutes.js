import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Login } from '../core/modules/Login'
import { Register } from '../core/modules/Register'
import { ForgotPassword } from '../core/modules/ForgotPassword'
import { VerifyEmail } from '../core/modules/VeriryEmail'
import { NotFound } from '../core/status/NotFound'
import { ReinitialiserMonMdp } from '../core/modules/ReinitialiserMonMdp'
import { Cgu } from '../core/modules/Cgu'
import {PolitiqueDeConfidentialite} from '../core/modules/PolitiqueDeConfidentialite'

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/reinitialiser-mon-mdp' element={<ReinitialiserMonMdp/>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>}/>
            <Route path='/auth/verify-email' element={<VerifyEmail/>}/>
            <Route path='/auth/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/cgu' element={<Cgu />}/>
            <Route path='/politique-de-confidentialite' element={<PolitiqueDeConfidentialite/>}/>

            <Route path='/404' element={<NotFound/>} exact/>
            <Route path='*' element={<Navigate to='/auth/login' replace/>}/>
        </Routes>
    )
}
