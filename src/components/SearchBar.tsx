import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ position: "relative" }}>
        <FiSearch className="search-icon" size={20} />
        <motion.input
          type="text"
          className="search-input"
          placeholder="Search users by name or email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
