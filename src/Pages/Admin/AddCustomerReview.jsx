import React from 'react'

const AddCustomerReview = () => {
    return (
        <>
            return (
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar />
                <div className="flex-1 p-10">
                    <h1 className="text-2xl font-bold mb-6">Add Product</h1>

                    <form className="bg-white p-8 rounded-xl shadow-md max-w-lg space-y-4">


                        <input type="text" name="title" placeholder="Product Title"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />



                        <label className="text-xs font-bold text-gray-500 ml-1">Add image</label>
                        <input
                            type="file"
                            name="img"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border rounded-lg p-1"
                        />




                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold 
          py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Add Review
                        </button>

                    </form>
                </div >
            </div >
            );
        </>
    )
}

export default AddCustomerReview
