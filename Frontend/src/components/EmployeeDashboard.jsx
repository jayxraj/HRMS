import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import Rating from "react-rating-stars-component";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const userId = localStorage.getItem("userId");

  const [attendance, setAttendance] = useState(
    JSON.parse(localStorage.getItem("attendance")) || []
  );
  const [leaveRequests, setLeaveRequests] = useState(
    JSON.parse(localStorage.getItem("leaveRequests")) || []
  );
  const [payroll, setPayroll] = useState(
    JSON.parse(localStorage.getItem("payroll")) || []
  );
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("attendance");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [attendanceRes, leaveRes, payrollRes, reviewsRes] =
          await Promise.all([
            axios.get(`/api/employee/attendance?employeeId=${userId}`),
            axios.get(`/api/employee/leave-requests?employeeId=${userId}`),
            axios.get(`/api/employee/payroll/${userId}`),
            axios.get(`/api/employee/performance-reviews/${userId}`),
          ]);

        setAttendance(attendanceRes.data);
        setLeaveRequests(leaveRes.data);
        setPayroll(payrollRes.data);
        setReviews(reviewsRes.data);

        localStorage.setItem("attendance", JSON.stringify(attendanceRes.data));
        localStorage.setItem("leaveRequests", JSON.stringify(leaveRes.data));
        localStorage.setItem("payroll", JSON.stringify(payrollRes.data));
        localStorage.setItem("reviews", JSON.stringify(reviewsRes.data));

        setError("");
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("API Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  const handleMarkAttendance = async (present) => {
    try {
      const response = await axios.post("/api/employee/attendance", {
        employeeId: userId,
        present,
      });

      const updatedAttendance = [...attendance, response.data];
      setAttendance(updatedAttendance);
      localStorage.setItem("attendance", JSON.stringify(updatedAttendance));

      setSuccessMessage(
        `Marked ${present ? "Present" : "Absent"} successfully!`
      );
      setError("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark attendance");
    }
  };

  const handleRequestLeave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post("/api/employee/leave-requests", {
        employeeId: userId,
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        reason: formData.get("reason"),
      });

      const updatedLeaveRequests = [...leaveRequests, response.data];
      setLeaveRequests(updatedLeaveRequests);
      localStorage.setItem(
        "leaveRequests",
        JSON.stringify(updatedLeaveRequests)
      );

      setSuccessMessage("Leave request submitted successfully!");
      setError("");
      e.target.reset();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit leave request");
    }
  };

  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
        <h2>Employee Dashboard</h2>
        {error && <div className="alert error">{error}</div>}
        {successMessage && (
          <div className="alert success">{successMessage}</div>
        )}
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <button onClick={() => setActiveSection("attendance")}>
            Attendance
          </button>
          <button onClick={() => setActiveSection("leave")}>
            Leave Management
          </button>
          <button onClick={() => setActiveSection("payroll")}>Payroll</button>
          <button onClick={() => setActiveSection("reviews")}>
            Performance Reviews
          </button>
        </aside>

        {/* Main Content */}
        <div className="dashboard-content">
          {activeSection === "attendance" && (
            <section className="dashboard-card">
              <h3>Today's Attendance</h3>

              {/* Attendance Buttons */}
              <div className="attendance-actions">
                <button
                  className="btn present-btn"
                  onClick={() => handleMarkAttendance(true)}
                >
                  Mark Present
                </button>
                <button
                  className="btn absent-btn"
                  onClick={() => handleMarkAttendance(false)}
                >
                  Mark Absent
                </button>
              </div>

              {/* Attendance Table */}
              <div className="attendance-history">
                <h4>Attendance History</h4>

                {attendance.length === 0 ? (
                  <p className="no-data">No attendance records found</p>
                ) : (
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((record) => (
                        <tr
                          key={record.id}
                          className={record.present ? "present" : "absent"}
                        >
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>{record.present ? "Present" : "Absent"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {activeSection === "leave" && (
            <section className="dashboard-card full-screen">
              <h3>Leave Management</h3>
              <form
                onSubmit={handleRequestLeave}
                className="leave-request-form"
              >
                <label>
                  Start Date:
                  <input type="date" name="startDate" required />
                </label>
                <label>
                  End Date:
                  <input type="date" name="endDate" required />
                </label>
                <label>
                  Reason:
                  <textarea name="reason" required></textarea>
                </label>
                <button className="btn submit-btn" type="submit">
                  Submit Request
                </button>
              </form>

              {/* Leave History Table */}
              <div className="leave-history" id="scroll">
                <h4>Leave History</h4>
                {leaveRequests.length === 0 ? (
                  <p className="no-data">No leave requests found</p>
                ) : (
                  <table className="leave-table">
                    <thead>
                      <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRequests.map((leave) => (
                        <tr key={leave.id}>
                          <td>
                            {new Date(leave.startDate).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(leave.endDate).toLocaleDateString()}
                          </td>
                          <td>{leave.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {activeSection === "payroll" && (
            <section className="dashboard-card">
              <h3>Payroll Information</h3>
              {payroll.length === 0 ? (
                <p className="no-data">No payroll records found</p>
              ) : (
                <div className="payroll-list">
                  {payroll.map((record) => (
                    <div key={record.id} className="payroll-item">
                      <span>
                        {new Date(record.paymentDate).toLocaleDateString()}
                      </span>
                      <span>₹{record.netSalary.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeSection === "reviews" && (
            <section className="dashboard-card">
              <h3>Performance Reviews</h3>
              {reviews.length === 0 ? (
                <p className="no-data">No performance reviews available</p>
              ) : (
                <div className="reviews-container">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <span>
                        {review.reviewer} -{" "}
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                      <Rating
                        count={5}
                        value={review.rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p>{review.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
