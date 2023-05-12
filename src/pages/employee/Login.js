import { motion } from "framer-motion"

function Login () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            로그인 🎉
        </motion.div>
    );
}

export default Login;