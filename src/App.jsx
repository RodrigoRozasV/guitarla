import { useState } from "react";
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App(){
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCar (item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if(itemExists >= 0){ //existe en el carrito
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        }else{ // no existe en el carrito
            item.quantity = 1
            setCart([...cart, item])
        }
        
    }

    return(
        <>
            <Header
                cart={cart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {
                        data.map((guitar) => (
                            <Guitar
                                key={guitar.id}
                                guitar={guitar}
                                setCart={setCart}
                                addToCar={addToCar}
                            />
                        ))
                    }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default App