import { Box, Flex, Heading, Text, Divider, Image, Spacer } from "@chakra-ui/react";
import React, { useEffect } from 'react'
import Arrow_key_img from "../utills/Arrow_key_img.jpg"
import Joystickimage from "../utills/Joystickimage.jpg"
import DifficultyCheckboxGroup from "../Components/DifficultyCheckboxGroup";
import computer_tablet_phoneimage from "../utills/computer_tablet_phoneimage.jpg"

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem("fdscore")) || {}
    // const [score, setScore] = useState({})
    useEffect(() => {
        if (user.length === 0) {
            localStorage.setItem("fdscore", JSON.stringify({
                "easy": 0,
                "medium": 0,
                "hard": 0,
            }))
            localStorage.setItem("noquestion", 0);
        }
    }, [user]);


    return (
        <Flex bg="gray.200" direction={{ base: "column", md: "row" }} gap={"20px"} justify="center" align="center" minH="100vh" padding={"0px 25px 0px 25px"} bgColor="#e9e5d9" >
            <Box px={{ base: 4, md: 8 }} py={8} w={{ base: "100%", md: "70%" }}  >
                <Heading as="h1" size="xl" fontWeight={"normal"} mb={4} w="100%" textAlign={"left"}>Flight Director Test</Heading>
                <Divider color={"white"} border={"1px solid white"} />
                <Heading as="h3" size="md" fontWeight={"normal"} mb={4} mt={4} w="100%" textAlign={"left"}>
                    Overview :
                </Heading>
                <Box overflowX={"hidden"} overflowY={"scroll"} height={"500px"}>
                    <Text fontSize="small" mb={5} w={"100%"} textAlign="left">
                        The pupose of this test is to measures your hand and eye coordination. Your goal is o keep vertical and horizontal line centered.
                    </Text>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Controls :
                    </Heading>
                    <Text fontSize="small" mt={"2"} mb={"2"} w={"100%"} textAlign="left">
                        There are two ways to control the aircraft:
                    </Text>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                        <Box>
                            <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                                <span style={{ fontWeight: "bold" }}>A</span> arrows on the keyboard
                            </Text>
                            <Image src={Arrow_key_img} alt="Arrowkeyimg" />
                        </Box>
                        <Box>
                            <Text fontSize="small" w={"100%"} mb={"2"} textAlign="left">
                                <span style={{ fontWeight: "bold" }}>B</span> Joystick (strongly recommended)
                            </Text>
                            <Image src={Joystickimage} alt="joystickimg" />
                        </Box>
                    </Box>
                    <Heading as="h3" size="md" mb={"2"} fontWeight={"normal"} w="100%" textAlign={"left"}>
                        Compatibility :
                    </Heading>
                    <Box>
                        <Image src={computer_tablet_phoneimage} alt="Arrowkeyimg" />
                    </Box>
                    <Text fontSize="small" mt={"2"} mb={"2"} w={"100%"} textAlign="left">
                        This test is compatible with PC, mobile and tablets.
                    </Text>
                </Box>
            </Box>
            <Box px={{ base: 4, md: 8 }} py={8} w={{ base: "100%", md: "30%" }} p={"20px"} >
                <Box overflowX={"hidden"} overflowY={"scroll"} maxHeight={"300px"} marginBottom={"20px"}>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Easy</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.easy||0}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 100%</Text>
                    </Box>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Medium</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.medium||0}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 98%</Text>
                    </Box>
                    <Box bg="white" border="2px solid black" borderBottom={"none"} w="100%" p={4}>
                        <Heading as="h3" size="md" fontWeight={"medium"} m="auto" color={"#757575"} w={"80%"} textAlign="left">Hard</Heading>
                        <Text color={"#757575"} fontSize="lg">Your Average Score: <span style={{ "color": "red" }}>{user.hard||0}%</span></Text>
                        <Text color={"#757575"} fontSize="lg">Global Score: 85%</Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size={"md"} as={"h3"} fontWeight="medium" w={"100%"} textAlign="left">Difficulty</Heading>
                    <DifficultyCheckboxGroup />
                </Box>
            </Box>
        </Flex >
    );
}

export default HomePage;
