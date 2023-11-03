import { ReactNode } from "react";
import Header from "../../components/Header";
import { useWallet } from "@solana/wallet-adapter-react";
require("@solana/wallet-adapter-react-ui/styles.css");

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div
        className="h-screen relative flex flex-col overflow-auto"
        style={{
          background: `#141414`,
        }}
      >
        <Header />
        <div className="flex xl:h-[calc(100%-90px)] lg:overflow-hidden lg:h-[calc(100%-75px)] h-[calc(100%-70px)] lg:w-full justify-center items-center lg:pb-0 pb-[50px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
