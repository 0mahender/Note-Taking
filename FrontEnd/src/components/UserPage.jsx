import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { matchRoutes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Notes from "./Notes";

function UserPage() {
  const param = useParams();
  const [list, setList] = React.useState([]);
  const [userName, setUserName] = React.useState(param.username);
  const [onHover, setOnHover] = React.useState(null);
  const [inputVal, setInputVal] = React.useState("");
  const [drop, setDrop] = React.useState("");
  const [inputBox, setInputBox] = React.useState(false);
  const [updateInput, setUpdateInput] = React.useState(false);
  const [item_Id, setItem_Id] = React.useState("");
  const [newInput, setNewInput] = React.useState("");

  const [listName, setListName] = React.useState("");
  const [list_id, setList_id] = React.useState("");

  // setUserName(param.username)

  const handleKeyPress = () => {
    const payload = {
      listName: inputVal,
      content: "",
    };

    fetch("http://localhost:3000/lists/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
    setListName(inputVal);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/lists/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
    setListName("");
  };

  const handleUpdate = (id) => {
    const payload = {
      listName: newInput,
    };

    fetch(`http://localhost:3000/lists/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("updated!");
        fetchData();
      })
      .catch((err) => console.log(err));

    setListName(newInput);
  };

  const fetchData = () => {
    fetch("http://localhost:3000/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setList(res.lists);
      })
      .catch((err) => console.log(err));
    setInputVal(" ");
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Flex>
      <Box
        w={"300px"}
        borderRadius={"3px"}
        h={"600px"}
        p={"10px"}
        fontFamily={"Roboto, sans-serif"}
        mt={"120px"}
        ml={"150px"}
        bg={"whitesmoke"}
      >
        <Flex
          justifyContent={"left"}
          placeItems={"center"}
          gap={"10px"}
          p={"2px"}
          borderRadius={"30px"}
          bg={"LightCyan"}
        >
          <Box>
            <Image
              w={"50px"}
              borderRadius={"50%"}
              src="https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg?ga=GA1.1.413494677.1708697011"
              objectFit={"cover"}
            />
          </Box>{" "}
          <Text fontWeight={"bold"} fontSize={"3xl"}>
            {userName}
          </Text>
        </Flex>
        <Box mt={"10px"}>
          <Button
            border={"1px solid black"}
            color={"black"}
            colorScheme="black"
            variant={"solid"}
            w={"60px"}
            h={"25px"}
            pr={"20px"}
            onClick={() => setInputBox(!inputBox)}
            fontSize={"smaller"}
          >
            <SmallAddIcon boxSize={"15px"} />
            create
          </Button>

          <Input
            w={"12%"}
            display={inputBox ? "block" : "none"}
            position={"absolute"}
            left={"230px"}
            top={"190px"}
            boxShadow={" 0 4px 8px rgba(173, 216, 230, 5)"}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputVal(e.target.value);
                setInputBox(false);
                handleKeyPress();
              }
            }}
          ></Input>
        </Box>
        <Box
          maxH={"500px"}
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "white", // Color of the scrollbar thumb
              borderRadius: "10px", // Rounded edges for the scrollbar thumb
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent", // Transparent background
            },
          }}
        >
          <Box height={"700px"}>
            {list.length != 0 ? (
              list.map((item) => (
                <Box
                  key={item._id}
                  mt={"10px"}
                  mr={"5px"}
                  borderRadius={"10px"}
                  h={"40px"}
                  onClick={() => {
                    setListName(item.listName);
                    setList_id(item._id);
                  }}
                  boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
                  onMouseEnter={() => setOnHover(item._id)}
                  onMouseLeave={() => setOnHover(null)}
                >
                  <Flex
                    justifyContent={"space-between"}
                    placeItems={"center"}
                    cursor={"pointer"}
                    mt={"6px"}
                    h={"30px"}
                    pt={"8px"}
                    pl={"10px"}
                  >
                    {" "}
                    {updateInput && item_Id === item._id ? (
                      <Input
                        value={newInput}
                        border={"none"}
                        _focus={{ border: "none", boxShadow: "none" }}
                        onChange={(e) => setNewInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setUpdateInput(false);

                            handleUpdate(item._id);
                          }
                        }}
                      ></Input>
                    ) : (
                      <Text>{item.listName}</Text>
                    )}
                    <Box
                      p={"3px"}
                      w={"15px"}
                      h={"30px"}
                      display={
                        onHover === item._id && !updateInput ? "block" : "none"
                      }
                      onClick={() =>
                        setDrop((preval) => (preval === "" ? item._id : ""))
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Box>
                  </Flex>
                  <Box
                    position={"absolute"}
                    display={drop === item._id ? "block" : "none"}
                    borderRadius={"3px"}
                    boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
                    w={"80px"}
                    bg={"whitesmoke"}
                    left={"420px"}
                  >
                    <VStack textAlign={"center"} gap={"0"} p={"2px"}>
                      <Box
                        _hover={{ bg: "LightGray" }}
                        onClick={() => handleDelete(item._id)}
                        cursor={"pointer"}
                        w={"100%"}
                      >
                        Delete
                      </Box>

                      <Box
                        _hover={{ bg: "LightGray" }}
                        onClick={() => {
                          setUpdateInput(!updateInput);
                          setItem_Id(item._id);
                          setDrop("");
                          setNewInput(item.listName);
                        }}
                        w={"100%"}
                        borderTop={"0.5px solid black"}
                      >
                        Reanme
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              ))
            ) : (
              <Box pt={"80px"} fontSize={"larger"} fontWeight={"medium"}>
                {" "}
                Looks like it’s blank here. Create your first note! 😿{" "}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Notes list_id={list_id} />
    </Flex>
  );
}

export default UserPage;
