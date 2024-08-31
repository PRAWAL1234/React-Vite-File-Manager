import React from 'react'
import { useState,useEffect } from 'react'

function Header() {
  let drive;
  let paths = [];

  if (!localStorage.getItem("drive"))
    localStorage.setItem("drive", JSON.stringify({}));

  function createFile() {
    let currentFiles;
    let i=0;
    var name = document.querySelector("#file").files[0].name;
    drive = JSON.parse(localStorage.getItem("drive"));
    currentFiles = drive;
    for (i = 1; i < paths.length; i++) currentFiles = currentFiles[paths[i]].files;

    currentFiles[name]= { type: "file" } 
    localStorage.setItem(
      "drive",
      JSON.stringify({ ...drive })
    );

    window.location.reload();    
  }
  
     
  function createFolder() {
    let currentFiles;
    let i=0;
    var name = document.querySelector("#folder").value;
    console.log(name)
    drive = JSON.parse(localStorage.getItem("drive"));
    currentFiles = drive;
    console.log(currentFiles)
    for (i = 1; i < paths.length; i++) currentFiles = currentFiles[paths[i]].files;

    currentFiles[name]= { type: "folder", files: {} }
    localStorage.setItem(
      "drive",
      JSON.stringify({ ...drive })
    );
    window.location.reload();
  }
  return (
    <header className=' flex justify-between shadow-xl p-5 max-[550px]:flex-wrap gap-5 max-[550px]:justify-start'>
        <div onClick={()=> window.location.reload()}>
            <h1 className='flex gap-2 items-center cursor-pointer'><img className='h-10 ' src="https://img.icons8.com/3d-fluency/94/layers.png" alt="layers"/>File Manager</h1>
        </div>
        <div className='flex gap-5 max-[380px]:flex-wrap'>
            <div onClick={()=>document.getElementById('my_modal_1').showModal()} className='transition-all hover:shadow-xl shadow-lg duration-200 bg-green-600 cursor-pointer text-white py-2 px-5 rounded-xl gap-2 flex btn border-none'><img className='h-7' src="https://img.icons8.com/3d-fluency/94/add-file.png" alt="add-file"/> Create Directory</div>

            <div onClick={()=>document.getElementById('my_modal_2').showModal()} className='btn border-none transition-all hover:shadow-xl duration-200 shadow-lg bg-blue-600 cursor-pointer text-white py-2 px-5 rounded-xl gap-2 flex'> <img className='h-7' src="https://img.icons8.com/3d-fluency/94/upload-to-cloud.png" alt="upload-to-cloud"/>Upload File</div>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Enter Directory name</p>
    <input type="text" className='w-full h-7 rounded-lg' id='folder' />
    <div className="modal-action">
      <form method="dialog">
        <button className="btn bg-red-800 text-white" >Close</button>
      </form>
      <form action="" className='form' >
        <div className='btn bg-green-700 text-white'  onClick={createFolder}>Submit</div>
      </form>
    </div>
  </div>
</dialog>


<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Upload File Here </p>
    <input type="file" className='w-full h-7 rounded-lg' id='file' />
    <div className="modal-action">
      <form method="dialog">
        <button className="btn bg-red-800 text-white" >Close</button>
      </form>
      <form action="" className='form' >
        <div className='btn bg-green-700 text-white'  onClick={createFile}>Submit</div>
      </form>
    </div>
  </div>
</dialog>
    </header>
    
  )
  
  
} 

export default Header
