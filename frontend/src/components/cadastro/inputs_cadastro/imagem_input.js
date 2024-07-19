import React,{ useState } from "react"
import ImagemStyle from "./input.module.css"

export default function Imagem_input(){
    const [visualiza, setVisualiza] = useState("")

    function previewImage(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setVisualiza(reader.result)
      }

      if (file) {
        reader.readAsDataURL(file)
      } else {
        setVisualiza("")
      }
    }


    return(
        <div className={ImagemStyle.esquerda}>
        <input
          type="file"
          id="imagem"
          required
          accept="image/*"
          onChange={previewImage}
          style={{display: "none"}}
        />
        <label htmlFor="imagem" className={ImagemStyle.labelImagem}>Escolha uma Imagem</label>
  
        <div className="preview-container">
          {visualiza && <img className="preview-image" src={visualiza} />}
          {/* Mostra a imagem apenas se houver uma URL de previewSrc */}
        </div>
      </div>
    )
}