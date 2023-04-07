import Logo from "../../images/Logo";

const Loader = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-white/60 z-50 flex items-center justify-center flex-col">
      <div class="spinner spinner-1"></div>
      <div className="animate-bounce">
        <Logo />
      </div>
    </div>
  );
};

export default Loader;
