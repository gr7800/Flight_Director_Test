import React, { useEffect, useState,useRef } from 'react'
import { Box, CircularProgress, Flex, Progress, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Startgame = () => {
    let navigate = useNavigate();

    const [elapsedTime, setElapsedTime] = useState(0);
    const totalTime = 3*60; // 5 minutes in seconds
    const minutes = Math.floor((totalTime - elapsedTime) / 60);
    const ms = elapsedTime % 60;
  
    useEffect(() => {
      if (minutes < 0) {
        let totalScore = Math.floor((score / total) * 100)
        let temp=JSON.parse(localStorage.getItem("fdscore"));
        let diffculty = localStorage.getItem("difficulty");
        localStorage.setItem("fdscore",JSON.stringify({...temp,[diffculty]:totalScore}))
        navigate("/result", {
          state: { totalScore: totalScore }
        });
        
      }
      const intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [elapsedTime]);
  
    const progress = (elapsedTime / totalTime) * 100;
  
  
    // ...................... 
    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [dx, setDx] = useState(1);
    const [dy, setDy] = useState(1);
    const [score, setScore] = useState(0);
    const [total, setToatal] = useState(0);
  
    const boxRef = useRef(null);
    const centerPoint = {
      x: boxRef.current ? boxRef.current.clientWidth / 2 : 200,
      y: boxRef.current ? boxRef.current.clientHeight / 2 : 200
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const nextX = x + dx;
        const nextY = y + dy;
        if (nextX < 0 || nextX > boxRef.current.clientWidth - 2) {
          setDx(-dx);
        } else {
          setX(nextX);
        }
        if (nextY < 0 || nextY > boxRef.current.clientHeight - 2) {
          setDy(-dy);
        } else {
          setY(nextY);
        }
        setToatal((s) => s + 1);
        // Check if lines are close to center point and update color and score
        const distanceX = Math.abs(x - centerPoint.x);
        const distanceY = Math.abs(y - centerPoint.y);
        if (distanceX < 10 && distanceY < 10) {
          boxRef.current.children[0].style.backgroundColor = "yellow";
          boxRef.current.children[1].style.backgroundColor = "yellow";
          setScore((sc) => sc + 1);
        } else {
          boxRef.current.children[0].style.backgroundColor = "red";
          boxRef.current.children[1].style.backgroundColor = "red";
        }
      }, 40);
  
      return () => clearInterval(intervalId);
    }, [x, y, dx, dy, score]);
  
    useEffect(() => {
      const handleKeyPress = (event) => {
        switch (event.code) {
          case "ArrowUp":
            setDy(-1);
            break;
          case "ArrowDown":
            setDy(1);
            break;
          case "ArrowLeft":
            setDx(-1);
            break;
          case "ArrowRight":
            setDx(1);
            break;
          default:
            break;
        }
  
        // Increase score if lines are yellow
        if ((Math.abs(centerPoint.y - y) < 10) && (Math.abs(centerPoint.x - x) < 10)) {
          setScore((sc)=>sc+1);
        }
      };
  
      window.addEventListener("keydown", handleKeyPress);
  
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [centerPoint.x, centerPoint.y, x, y]);
  
  
  
    return (
      <Box bg="aquamarine" maxW={"100%"} >
        <Box width={"100%"} display={"flex"} >
          <CircularProgress
            value={progress}
            color={progress < 50 ? "green.400" : progress < 80 ? "yellow.400" : "red.400"}
            size="120px"
            thickness="8px"
            capIsRound
          >
            <svg style={{
              fontSize: "20px",
              fill: "currentColor",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
                {minutes < 10 ? `0${minutes}` : minutes}:{ms < 10 ? `0${ms}` : ms}
              </text>
            </svg>
          </CircularProgress>
        </Box>
        <Box
          bg="aquamarine"
          // h="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            ref={boxRef}
            position="relative"
            w="400px"
            h="400px"
            bg="white"
            borderRadius={"30px"}
            bgImage={"https://www.latestpilotjobs.com/h5games/flightDirectorTest/v2/images/under.jpg"}
            bgSize={"cover"}
          >
            <Box
              position="absolute"
              top={`${y}px`}
              left="15px"
              right="0"
              w="90%"
              h="4px"
              bg={Math.abs(centerPoint.y - y) < 5 ? "yellow.500" : "red.500"}
              transition="top 0.5s ease-out, bottom 0.5s ease-out"
            />
            <Box
              position="absolute"
              left={`${x}px`}
              top="15px"
              bottom="0"
              w="4px"
              h="90%"
              bg={Math.abs(centerPoint.x - x) < 5 ? "yellow.500" : "red.500"}
              transition="left 0.5s ease-out, right 0.5s ease-out"
            />
            <Box
              position="absolute"
              w="100%"
              h="100%"
              borderRadius={"30px"}
              bgImage={"https://www.latestpilotjobs.com/h5games/flightDirectorTest/v2/images/body.png"}
              bgSize={"cover"}
            />
          </Box>
        </Box>
      </Box >
    )
}

export default Startgame