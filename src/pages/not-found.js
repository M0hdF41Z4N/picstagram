// Importing required packages
import { useEffect } from "react"
import Header from  '../components/header';

// Exporting NotFound Page
export default function NotFound   () {

    // Setting up the title of the page
    useEffect(()=> {
        document.title = 'Not Found - Procode';
    },[]);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">Not Found</p>
            </div>
        </div>
    )
}