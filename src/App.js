import 'bootstrap/dist/css/bootstrap.min.css';
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
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <ul className="navbar-nav">
                        <li className="nav-item m-2">
                            <Link to="/fixed-partition" className="btn btn-primary">Fixed Partition</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/fifo-page-replacement" className="btn btn-secondary">FIFO Page Replacement</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/fcfs-scheduling" className="btn btn-success">FCFS Scheduling</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/processor-management" className="btn btn-danger">Processor Management</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/bankers-algorithm" className="btn btn-warning">Banker's Algorithm</Link>
                        </li>
                    </ul>
                </div>
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
