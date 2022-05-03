import { useEffect, useRef, useState, React, useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";
import styles from "/src/styles/Wallet.module.css";
import { ethers } from "ethers";

const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Подключить кошелек");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Подключен");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    // let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
    // setContract(tempContract);
  };

  // useEffect(() => {
  // 	if (contract != null) {
  // 		updateBalance();
  // 		updateTokenName();
  // 	}
  // }, [contract]);

  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar">
      <button className={styles.button7} onClick={logout}>
        Выйти
      </button>

      <div className={styles.walletCard}>
        <Link to="/about">О сайте</Link>
      </div>

      <div className={styles.walletCard}>
        <Link to="/posts">Мои заявки</Link>
      </div>

      <div className={styles.logo}>{"TRUST P2P"}</div>

      <button className={styles.button6} onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div className={styles.walletCard}>Адрес: {defaultAccount}</div>
    </div>
  );
};

export default Navbar;
