import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FixedPartition from './Component/FixedPartition';
import FIFOPageReplacement from './Component/FIFOPageReplacement';
import FCFSScheduling from './Component/FCFSScheduling';
import ProcessorManagement from './Component/ProcessorManagement';
import BankersAlgorithm from './Component/BankersAlgorithm';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/fixed-partition">Fixed Partition</Link></li>
                        <li><Link to="/fifo-page-replacement">FIFO Page Replacement</Link></li>
                        <li><Link to="/fcfs-scheduling">FCFS Scheduling</Link></li>
                        <li><Link to="/processor-management">Processor Management</Link></li>
                        <li><Link to="/bankers-algorithm">Banker's Algorithm</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/fixed-partition" element={<FixedPartition />} />
                    <Route path="/fifo-page-replacement" element={<FIFOPageReplacement />} />
                    <Route path="/fcfs-scheduling" element={<FCFSScheduling />} />
                    <Route path="/processor-management" element={<ProcessorManagement />} />
                    <Route path="/bankers-algorithm" element={<BankersAlgorithm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
