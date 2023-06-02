import { motion } from "framer-motion"

function GradeItem () {

    return (
        <motion.tr>
            <td>1</td>
            <td>경영학과</td>
            <td>1</td>
            <td>20131231</td>
            <td>여다현</td>
            <td>23</td>
            <td>0</td>
            <td>0</td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td>100</td>
            <td>A+</td>
            <td></td>
        </motion.tr>
    );
}

export default GradeItem;