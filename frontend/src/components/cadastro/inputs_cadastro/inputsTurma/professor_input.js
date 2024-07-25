import React from "react"
import ProfessorStyle from "../input.module.css"

export default function Professor_input(){
    return(
        <div className={ProfessorStyle.esquerda}>
            <label className={ProfessorStyle.label}><b>Professor</b></label><br />
            <select name="SelecaoProfessor" className={ProfessorStyle.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Andre">André</option>
                <option value="Gustavo">Gustavo</option>
                <option value="Jimmy">Jimmy</option>
                <option value="Diego">Diego</option>
            </select><br />
        </div>
    )
}