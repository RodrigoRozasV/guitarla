import { useState, useEffect } from "react";
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App(){
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    

    function addToCar (item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if(itemExists >= 0){ //existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{ // no existe en el carrito
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
        const updatedCart = cart.map( item =>{
            if (item.id ===  id && item.quantity < MAX_ITEMS) {
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id ===  id && item.quantity > MIN_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity - 1
                } 
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }


    return(
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
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