import Axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const [product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData)
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])