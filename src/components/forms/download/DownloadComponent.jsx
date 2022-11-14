import { Button } from "@mui/material"
import * as React from "react"
import { useDownloadFile } from "../../../hooks/useDownloadFile"

 const DownloadComponent = ({url}) => {
	const downloadUrl = useDownloadFile(url)
    console.log("downloadUrl", downloadUrl)
	return (
        <>
		<Button 
            variant="contained"
            color="primary"
            onClick={() => window.open(downloadUrl)}
            >
            Descargar Archivo
            </Button>
        </>
		)
}

export default DownloadComponent;