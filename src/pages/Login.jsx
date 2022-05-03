import {useContext, React, useState, useEffect} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import {ethers} from 'ethers';
import styles from '../styles/Wallet.module.css';


const Login = () => {    
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Добро пожаловать</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"/>
                <button className={styles.button6}>Войти</button>
            </form>
        </div>
    );
};

export default Login;
