import React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TutorialComparisonSwiper } from "./tutorial-comparison-swiper";
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom";
import { ChevronsDownIcon } from "lucide-react";


function BottomBar({ tutorialProgress, setTutorialProgress }: { tutorialProgress: number, setTutorialProgress: (value: number) => void }) {
    return (
        <>
            <div className="w-full h-fit flex flex-col p-2 gap-2 justify-between">
                <Tabs onValueChange={() => {
                    if (tutorialProgress == 3) {
                        setTutorialProgress(4);
                    }
                }}>
                    <TabsList className={cn("grid w-full grid-cols-4", tutorialProgress != 3 ? "blur-sm" : "")}>
                        <TabsTrigger className="bg-white" value="p" disabled={tutorialProgress != 3}>Participant</TabsTrigger>
                        <TabsTrigger className="bg-white" value="s" disabled={tutorialProgress != 3}>Sponsor</TabsTrigger>
                        <TabsTrigger className="bg-white" value="j" disabled={tutorialProgress != 3}>Judge</TabsTrigger>
                        <TabsTrigger className="bg-white" value="o" disabled={tutorialProgress != 3}>Organizer</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-row justify-between gap-2">
                    <Button
                        variant="outline"
                        className={cn("w-full gap-1", tutorialProgress != 4 ? "text-gray-500 blur-sm" : "")}
                        disabled={tutorialProgress != 4}
                        onClick={() => {
                            if (tutorialProgress == 4) {
                                setTutorialProgress(5);
                            }
                        }}
                    > Flip to the back
                    </Button>

                    <Button
                        variant="outline"
                        className={cn("w-full", tutorialProgress != 5 ? "text-gray-500 blur-sm" : "")}
                        disabled={tutorialProgress != 5}
                        onClick={() => {
                            if (tutorialProgress == 5) {
                                setTutorialProgress(6);
                            }
                        }}
                    > View in 3D </Button>
                </div>
            </div>
        </>
    )
}

function TutorialView() {
    const navigate = useNavigate();
    const [tutorialProgress, setTutorialProgress] = React.useState(0);
    // 0: start
    // 1: swipe up
    // 2: swipe down
    // 3: bottom bar: role
    // 4: bottom bar: flip
    // 5: bottom bar: 3d
    // 6: done

    return (
        <>
            <div className="w-screen h-screen flex flex-col">
                <TutorialComparisonSwiper tutorialProgress={tutorialProgress} setTutorialProgress={setTutorialProgress} />
                <BottomBar tutorialProgress={tutorialProgress} setTutorialProgress={setTutorialProgress} />

                {tutorialProgress == 0 && (
                    <div className="z-20 text-white text-3xl absolute 
                        flex flex-col items-center justify-center
                            top-0 left-0 w-full h-full
                        ">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="font-bold">Welcome to the tutorial!</div>
                            <Button 
                                className="bg-white text-black hover:text-white"
                                onClick={() => {
                                    setTutorialProgress(1);
                                }}
                            > Next </Button>
                        </div>
                    </div>
                )}

                {tutorialProgress == 3 && (
                    <div className="z-20 text-white text-3xl absolute 
                        flex flex-col items-center justify-center
                            top-0 left-0 w-full h-full
                            pointer-events-none
                        ">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="font-bold">View Different Roles!</div>
                            <div className="text-white text-xl"> Click on a different role to view it  </div>
                            <ChevronsDownIcon />
                        </div>
                    </div>
                )}

                {tutorialProgress == 4 && (
                    <div className="z-20 text-white text-3xl absolute 
                        flex flex-col items-center justify-center
                            top-0 left-0 w-full h-full
                            pointer-events-none
                        ">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="font-bold">Flip to the back!</div>
                            <div className="text-white text-xl"> Click on the flip button to view the back </div>
                            <ChevronsDownIcon />
                        </div>
                    </div>
                )}

                {tutorialProgress == 5 && (
                    <div className="z-20 text-white text-3xl absolute 
                        flex flex-col items-center justify-center
                            top-0 left-0 w-full h-full
                            pointer-events-none
                        ">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="font-bold">View in 3D!</div>
                            <div className="text-white text-xl"> Click on the 3D button to view in 3D </div>
                            <ChevronsDownIcon />
                        </div>
                    </div>
                )}

                {tutorialProgress == 6 && (
                    <div className="z-20 text-white text-3xl absolute 
                        flex flex-col items-center justify-center
                            top-0 left-0 w-full h-full
                        ">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="font-bold">You are all set!</div>
                            <Button 
                                className="bg-white text-black hover:text-white"
                                onClick={() => {
                                    navigate('/vote');
                                }}
                            > Start Voting </Button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default TutorialView
