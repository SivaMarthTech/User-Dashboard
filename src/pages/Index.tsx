import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiSearch, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import "../styles/dashboard.css";

interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchUsers();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <motion.div
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiRefreshCw size={24} />
          </motion.div>
          <motion.p
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading users...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <motion.div
          className="error-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiAlertCircle className="error-icon" size={48} />
          <p className="error-text">Error: {error}</p>
          <motion.button
            className="retry-button"
            onClick={handleRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw size={16} />
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <motion.header
        className="dashboard-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.div
            className="icon-wrapper"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiUsers className="header-icon" />
          </motion.div>
          <h1 className="dashboard-title">User Dashboard</h1>
          <p className="dashboard-subtitle">
            Browse and search through our user directory
          </p>
        </div>
      </motion.header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredUsers.length > 0 && (
          <motion.div
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiSearch size={16} />
            Showing {filteredUsers.length} of {users.length} users
            {searchQuery && (
              <span className="search-query"> for "{searchQuery}"</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {filteredUsers.length === 0 ? (
          <motion.div
            className="no-results"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiSearch className="no-results-icon" size={64} />
            <h3>No users found</h3>
            <p>No users found matching "{searchQuery}"</p>
            <motion.button
              className="clear-search-button"
              onClick={() => setSearchQuery("")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Search
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="user-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserCard user={user} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
