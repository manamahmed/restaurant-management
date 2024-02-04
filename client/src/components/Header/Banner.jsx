const Banner = () => {
  return (
    <div>
      <div
        className="hero h-[500px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/XC5V0nG/spencer-davis-5-Ue-N8-Vr-Cxvs-unsplash.jpg)",
        }}
      >
        <div className=" bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl bg-slate-100 p-3 font-bold opacity-70 rounded">
              <p className="text-black">Are You Hungry?</p>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
