import mongoose from 'mongoose'

const dbConnect = () => {
    mongoose.connect( process.env.MONGODB_CLOUD_URI)
    .then
    (conn => console.log(`mongodb is now connected with express by using ${conn.connection.host}`))
    .catch(err => console.log(`mongodb connection failed b/c ${err.message}`)) 
}
export default dbConnect