import React, { useState } from "react";
import { axiosWithAuth } from '../util/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const updatedColor = {
  color: "",
  code: { hex: "" },
  id: 0
}


const ColorList = ({ colors, updateColors, getColorList }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [updated, setUpdated ] = useState(updatedColor)
  const [adding, setAdding] = useState(false)

  const addColor = e => {
    e.preventDefault()
    setUpdated({
      ...updated,
      id: parseInt(colors.length)
    })

    axiosWithAuth().post('/api/colors', updated)
      .then(res => {
        setUpdated(updatedColor)
        getColorList()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    var id = colorToEdit.id

    axiosWithAuth().put(`/api/colors/${id}`, colorToEdit)
      .then(res => {
        getColorList()
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    var id = color.id
    axiosWithAuth().delete(`/api/colors/${id}`, colorToEdit)
      .then(res => {
        setEditing(false)
        getColorList()
      })
      .catch(err => {
        console.log(err)
      })
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>

      )}
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label> 
            color name:
            <input
              onChange={e => 
                setUpdated({ ...updated, color: e.target.value})
              }
              value={updated.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e => 
                  setUpdated({...updated, color: e.target.value})
                }
                value={updated.code.hex}
              />
            </label>
            <div className="button-row">
              <button>add</button>
            </div>
        </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* Yeah, I did it here, and it was outside the sidebar, so I just moved it up ^^^^ */}
      </div>

  );
};

export default ColorList;
