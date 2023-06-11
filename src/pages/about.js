const about = () => {
  return (
    <div className="min-h-screen lg:mx-14 m-4 lg:my-10">
      <div className="flex flex-col lg:flex-row h-[45rem] lg:h-[35rem]">
        <div className="h-full w-full lg:w-8/12 bg-cover bg-center bg-[url(https://i.ibb.co/rcf64sx/IMG-20230611-124853.jpg)]">
          <div className="relative flex justify-center items-center bg-black/30  h-full w-full">
            <p className="uppercase text-4xl font-medium text-white/70 underline">
              About
            </p>
            <p className="absolute right-3 bottom-3 text-white/30 font-bold uppercase font-mono">
              Photo By{" "}
              <a
                href="https://www.facebook.com/pulak.dey.7737"
                target="_blank"
                className="underline"
              >
                Pulak Dey
              </a>
            </p>
          </div>
        </div>
        <div className="bg-silver h-full w-full lg:w-4/12 flex flex-col items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/ogw/AOLn63FcPB0Ak6eY0DaSssMoBGW9Qutmfu-VNRmeSNpsiQ=s400-c-mo"
            className="w-48 h-48 rounded-full mb-4"
            alt=""
          />
          <h1 className="font-medium text-2xl text-[#333333]">
            Muhammad Shafi
          </h1>
          <p className="font-serif italic text-[#525252]">
            <span className="text-primary">Owner</span> of Motion Diary
          </p>
          <p className="text-xs font-mono text-[#525252]">
            Full Stack Developer
          </p>
          <p className="text-sm font-medium text-[#525252]">
            Chattogram, Bangladesh
          </p>
        </div>
      </div>
      <div className="lg:mx-14 m-4 lg:my-4">
        <p className="font-medium font-mono">
          <span className="text-6xl text-primary">Y</span>ou love minimalism,
          want to be productive focusing only on the important things and want
          to take Ghost to the next level, Motion Diary is designed for you.
          Motion Diary focus on showing your content in a clean and simple way,
          focus on images, typography, and white space.
        </p>
      </div>
      <img
        src="https://i.ibb.co/y48nb44/LMC-20230610-155605-Color-boost-by-Riyan-1.jpg"
        className="mx-auto w-full lg:w-7/12 h-auto"
        alt=""
      />
      <p className="text-center font-mono">
        Photo By{" "}
        <a
          href="https://www.facebook.com/hasanalimijan"
          target="_blank"
          className="text-black/70 underline"
        >
          Muhammad Hasan Ali Mijan
        </a>
      </p>
      <p className="lg:mx-14 m-4 lg:my-4 font-medium font-mono">
        Motion Diary is a vibrant and interactive blog site that invites users
        to share their thoughts, ideas, and experiences with the world. With a
        user-friendly interface and intuitive design, it provides a seamless
        platform for individuals to showcase their writing skills and connect
        with a like-minded community. Users can create and publish their own
        captivating blog posts, covering a wide range of topics from personal
        anecdotes to travel adventures, technology, fashion, and more. Engaging
        features such as the ability to like and comment on posts foster lively
        discussions and encourage meaningful interactions among users. Whether
        you're an aspiring writer, a passionate storyteller, or simply someone
        who loves to explore diverse perspectives, Motion Diary is the perfect
        destination to immerse yourself in a world of captivating narratives and
        connect with fellow blogging enthusiasts.
      </p>
    </div>
  );
};

export default about;
