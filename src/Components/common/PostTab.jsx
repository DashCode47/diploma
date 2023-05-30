import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import subjectApi from "../../api/modules/subjects.api";
import { toast } from "react-toastify";

const PostTab = ({ id }) => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const uploadPost = async () => {
    console.log(id, value);
    const { response, err } = await subjectApi.addNewPOst(id, value);

    if (response) {
      toast.success("Succes", {
        position: "bottom-left",
      });
      setValue("");
    } else console.log(err);
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />

      <Button
        variant="contained"
        color="success"
        type="submit"
        onClick={uploadPost}
        sx={{ marginTop: 3 }}
      >
        Post
      </Button>

      {/* <Typography>{parse(value)}</Typography> */}
    </>
  );
};

export default PostTab;
