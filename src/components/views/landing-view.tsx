import { useNavigate } from "react-router-dom"
import BoxReveal from "@/components/ui/box-reveal"
import { DotPattern } from "@/components/ui/dot-pattern"

function LandingView() {
    const navigate = useNavigate()
    return (
        <div className="w-screen h-screen flex flex-col items-start md:items-center justify-center p-2">

            <DotPattern />

            <BoxReveal boxColor={"#000000"} duration={0.5}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold 
                mb-2 lg:mb-3"
                >Design</h1>
            </BoxReveal>

            <BoxReveal boxColor={"#000000"} duration={0.5}>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold 
                mb-3 md:mb-4 lg:mb-6"
                >Survey</h1>
            </BoxReveal>

            {/* flush button to right */}
            <div className="flex w-full justify-start md:justify-center">
                <BoxReveal boxColor={"#000000"} duration={0.5}>
                    <button className="
                    px-4 py-2 
                    text-md md:text-lg lg:text-xl 
                    rounded-md border border-black bg-white text-black 
                    hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200  m-4"
                    onClick={() => navigate("/tutorial")}
                    >
                        Go to Tutorial
                    </button>
                </BoxReveal>
            </div>
        </div>
    )
}

export default LandingView