import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormGroup, Input, Label, Button } from "reactstrap";
import "./DnDComponent.css";

function DnDComponent(props) {
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "16px",
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "70px",
    height: "70px",
    marginLeft: "15px",
    marginBottom: "10px",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={{ thumb }} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section
      className="container"
      style={{
        border: "2px solid  rgba(221, 221, 221, 0.171)",
        borderRadius: "5px",
      }}
    >
      <div>
        <button
          style={{
            background: "#6c757d",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "1.5rem",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "2px",
            marginLeft: "2px",
            color: "#fff",
            border: "2px solid rgba(221, 221, 221, 0.171)",
          }}
        >
          +
        </button>
      </div>

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p
          style={{
            fontSize: "0.7rem",
            color: "white",
            fontStyle: "italic",
            marginLeft: "55px",
            marginTop: "-35px",
          }}
        >
          Drag and Drop other Images that you have
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default DnDComponent;
