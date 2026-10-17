import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, dataUser, deleteUser, editUser } from './Store/RTK'
import { fa } from 'zod/locales'
import z from 'zod'
import { useForm } from 'react-hook-form'


let schema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  age: z.coerce.number().min(18, 'Возраст должен быть не меньше 18'),
  phone: z.coerce.number().min(100000000, "Не менее 9 чисел в номере")
})



function Redux() {
  let dispatch = useDispatch()
  let { data } = useSelector((state) => state.users)


  useEffect(() => {
    dispatch((dataUser()))
  }, [])


  let [open, setOpen] = useState(false)

  let { register, handleSubmit, watch, formState: { errors }, } = useForm()



  // ADD
  function onSubmit(user) {
    dispatch(addUser(user)).unwrap().then(() => {
      reset()
      setOpen(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  // EDIT
  function onEdit(user) {
    dispatch(editUser(user)).unwrap().then(() => {
      reset()
      setOpen(false)
    }).catch((error) => {
      console.log(error)
    })
  }


      


  return (
    <>
      <div>
        <button onClick={() => setOpen(true)}>ADD USER</button>


        <dialog open={open}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Name' {...register("name", { required: true })} />
            {errors.name && <p>{errors.name.message}</p>}

            <input type="number" placeholder='Age' {...register("age", { required: true })} />
            {errors.age && <p>{errors.age.message}</p>}

            <input type="tel" placeholder='Phone' {...register("phone", { required: true })} />
            {errors.phone && <p>{errors.phone.message}</p>}

            <button type="submit" onClick={() => setOpen(false)}>Save</button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </form>
        </dialog>

        

        {data.map((elem) => (

          <div key={elem.id}>

            <h1>{elem.name}</h1>
            <img style={{ width: "100px", borderRadius: "100%" }} src={elem.avatar} alt="" />
            <h2>{elem.age} years old</h2>
            <h2>{elem.status ? "Active" : "Inacive"}</h2>
            <h2>{elem.job}</h2>
            <h2>{elem.phone}</h2>
            <button onClick={() => dispatch(deleteUser(elem.id))}>Delete</button>
            <button onClick={() => editUser}>Edit</button>
            <hr />

          </div>

        ))}
      </div>

    </>
  )
}

export default Redux