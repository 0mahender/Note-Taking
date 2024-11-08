import { Box, Text, Textarea, Button } from "@chakra-ui/react";
import React from "react";

const Notes = ({ list_id }) => {
  const [content, setContent] = React.useState("");
  const [data, setData] = React.useState([]);
  const [Fdata, setFData] = React.useState([]);

  const handleClick = () => {
    const payload = {
      content: content,
    };

    fetch(`http://localhost:3000/lists/update/${list_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Note Created!");
        // fetchData()
      })
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    // setFData([  ])
    fetch(`http://localhost:3000/lists/onenote/${list_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData([res.lists]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // const filterData = () => {
  //   console.log(list_id);
  //   const FilterData = data.filter((item) => item._id === list_id);
  //   console.log(FilterData);
  //   setFData(FilterData);
  // };

  React.useEffect(() => {
    fetchData();
  }, [list_id]);

  // React.useEffect(() => {
  //   setFData([]);
  //   filterData();
  // }, [list_id]);

  console.log("Data", data);

  return (
    <Box>
      {data.length == 0 ? (
        <Box
          w={"800px"}
          borderRadius={"5px"}
          h={"600px"}
          mt={"120px"}
          ml={"4px"}
          bg={"#FFFBEB"}
          textAlign={"center"}
          paddingTop={"200px"}
        >
          <Text
            fontFamily={"Playwrite GB S, cursive"}
            fontOopticalSsizing={"auto"}
            color={"Gainsboro"}
            fontSize={"7xl"}
          >
            {" "}
            Note Here
          </Text>
        </Box>
      ) : (
        data.map((item) => (
          <Box
            key={item?._id}
            w={"800px"}
            borderRadius={"5px"}
            h={"600px"}
            mt={"120px"}
            ml={"4px"}
            bg={"#FFFBEB"}
          >
            <Text
              textAlign={"center"}
              height={"100px"}
              borderBottom={"0.5px solid Black"}
              boxShadow={"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"}
              fontSize={"4xl"}
              fontWeight={"semibold"}
              pt={"15px"}
              mx={"15px"}
            >
              {item.listName}
            </Text>
            <Box>
              <Textarea
                border={"1px solid red"}
                defaultValue={item.content || ""}
                onChange={(e) => setContent(e.target.value)}
                height={"410px"}
                resize={"none"}
                m={"30px"}
                autoFocus
                w={"90%"}
                _focus={{ border: "none", boxShadow: "none" }}
              />

              <Button
                onClick={handleClick}
                position={"absolute"}
                top={"42rem"}
                right={"23rem"}
              >
                save{" "}
              </Button>
            </Box>
          </Box>
        ))
      )}

      {/* }  */}
    </Box>
  );
};

export default Notes;
