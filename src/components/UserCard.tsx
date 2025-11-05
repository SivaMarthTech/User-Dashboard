import { motion } from "framer-motion";
import { AiFillBuild } from "react-icons/ai";
import { FiMail, FiGlobe } from "react-icons/fi";

interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      className="user-card"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="user-avatar"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {getInitials(user.name)}
      </motion.div>

      <motion.h3
        className="user-name"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {user.name}
      </motion.h3>

      <motion.div
        className="user-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="info-item">
          <FiMail className="info-icon" size={16} />
          <a href={`mailto:${user.email}`} className="user-link">
            {user.email}
          </a>
        </div>

        <div className="info-item">
          <FiGlobe className="info-icon" size={16} />
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="user-link"
          >
            {user.website}
          </a>
        </div>

        <div className="info-item">
          <AiFillBuild className="info-icon" size={16} />
          <span className="user-company">{user.company.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserCard;
