import React,{ useState } from "react"
import ImagemStyle from "./input.module.css"

export default function Imagem_input(){
    const [visualiza, setVisualiza] = useState("")

    const visualizarImagem = (event) => {
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
        <div className={ImagemStyle.contentImagem}>
          <input type="file" id="imagem" required style={{display: "none"}}
            accept="image/*"
            onChange={visualizarImagem} />
          <label htmlFor="imagem" className={ImagemStyle.inputImagem}>Adicionar Imagem</label>
      
          <div className={ImagemStyle.divDaImagem}>
            {visualiza && <img className={ImagemStyle.imagemEnviada} src={visualiza} />}
            {/* Mostra a imagem apenas se houver uma URL de previewSrc */}
          </div><br />
      </div>
    )
}