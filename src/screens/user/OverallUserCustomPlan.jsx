import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CustomPlanCard from "../../components/ui/CustomPlanCard";
import "../../styles/user/CustomPlanCard.css";
import PageLoader from "../../components/ui/PageLoader";
import Swal from "sweetalert2";

// 🔥 Set Your Main Wallet Address
const MAIN_WALLET_ADDRESS = "0x9B20A91B51D5257854331251bB3e7dcD84175B18"; // Replace with your actual wallet

const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC
const USDT_ABI = [
    "function transfer(address to, uint256 value) public returns (bool)",
    "function decimals() view returns (uint8)",
];

const OverallUserCustomPlan = () => {
    const [loading, setLoading] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState(null);
    const [walletType, setWalletType] = useState(null); // "MetaMask" or "SafePal"

    const planLists = [
        { packageName: "Basic", amount: "100" },
        { packageName: "Premium", amount: "500" },
        { packageName: "Deluxe", amount: "1000" },
        { packageName: "Exclusive", amount: "2000" },
        { packageName: "Luxury", amount: "5000" },
        { packageName: "Super Deluxe", amount: "10000" },
    ];

    // ✅ Detect & Connect Wallet (MetaMask or SafePal)
    const connectWallet = async (wallet) => {
        try {
            let walletProvider;

            if (wallet === "MetaMask") {
                if (!window.ethereum)
                    throw new Error("MetaMask is not installed.");
                walletProvider = new ethers.BrowserProvider(window.ethereum);
            } else if (wallet === "SafePal") {
                if (!window.safepal)
                    throw new Error("SafePal Extension not found.");
                walletProvider = new ethers.BrowserProvider(window.safepal);
            } else {
                throw new Error("Unsupported wallet.");
            }

            await walletProvider.send("wallet_requestPermissions", [
                { eth_accounts: {} },
            ]);

            const signer = await walletProvider.getSigner();
            const userAddress = await signer.getAddress();

            setWalletConnected(true);
            setWalletAddress(userAddress);
            setProvider(walletProvider);
            setWalletType(wallet);

            Swal.fire({
                icon: "success",
                title: `${wallet} Connected`,
                text: `Wallet Address: ${userAddress}`,
            });
        } catch (error) {
            console.error("Wallet connection failed:", error);
            Swal.fire({
                icon: "error",
                title: "Wallet Connection Failed",
                text: error.message || "Please try again.",
            });
        }
    };

    // ✅ Binance Smart Chain Auto Switch
    const switchToBSC = async () => {
        try {
            await provider.send("wallet_switchEthereumChain", [
                { chainId: "0x38" },
            ]);
            return true;
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Switch Network Failed",
                text: "Please manually switch to Binance Smart Chain.",
            });
            return false;
        }
    };

    // ✅ Handle Payment (Send USDT to Main Wallet)
    const handlePayment = async (plan) => {
        if (!walletConnected) {
            await connectWallet(walletType || "MetaMask"); // Auto-reconnect last used wallet
            if (!walletConnected) return;
        }

        try {
            const currentProvider =
                provider || new ethers.BrowserProvider(window.ethereum);
            const signer = await currentProvider.getSigner();

            if (
                !MAIN_WALLET_ADDRESS ||
                !ethers.isAddress(MAIN_WALLET_ADDRESS)
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Main Wallet",
                    text: "Please configure a valid main wallet address.",
                });
                return;
            }

            const network = await currentProvider.getNetwork();
            if (network.chainId !== 56) {
                const switched = await switchToBSC();
                if (!switched) return;
            }

            const usdtContract = new ethers.Contract(
                USDT_CONTRACT_ADDRESS,
                USDT_ABI,
                signer
            );
            const decimals = await usdtContract.decimals();
            const amountInUSDT = ethers.parseUnits(
                plan.amount.toString(),
                decimals
            );

            if (parseFloat(plan.amount) <= 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Invalid Amount",
                    text: "Select a valid plan.",
                });
                return;
            }

            // 🔥 Send USDT to the Main Wallet
            const tx = await usdtContract.transfer(
                MAIN_WALLET_ADDRESS,
                amountInUSDT
            );
            await tx.wait();

            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: `Plan "${plan.packageName}" purchased successfully.`,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.reason || "Please try again.",
            });
        }
    };

    // ✅ Confirmation Popup Before Payment
    const showConfirmation = async (plan) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to purchase the "${plan.packageName}" plan for $${plan.amount}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Buy Plan",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handlePayment(plan);
            }
        });
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="MatrimonyUserCustomPlan OverallUserCustomPlan">
                <div className="customPlan_heading">
                    <h1 className="title">Choose Your Perfect Plan</h1>
                    <p className="subTitle">
                        Explore Our Custom Plans Tailored for Every Need
                    </p>
                </div>

                {/* <div className="wallet-buttons">
          <button onClick={() => connectWallet("MetaMask")} className="wallet-btn">Connect MetaMask</button>
          <button onClick={() => connectWallet("SafePal")} className="wallet-btn">Connect SafePal</button>
        </div> */}

                <div className="offerCards">
                    {planLists.map((e, i) => (
                        <CustomPlanCard
                            sureConfirmation={() => showConfirmation(e)}
                            key={i}
                            data={e}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default OverallUserCustomPlan;
