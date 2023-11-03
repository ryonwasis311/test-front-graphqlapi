require("@solana/wallet-adapter-react-ui/styles.css");

export const BaseLayout = ({ children }) => {
  return (
    <>
      <div
        className="h-screen overflow-hidden relative flex flex-col"
        style={{
          background: `#141414`,
        }}
      >
        {children}
      </div>
    </>
  );
};
