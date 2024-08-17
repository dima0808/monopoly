import "./styles.css";
import React from "react";
import UpdateUserDialog from "../../components/admin/UpdateUserDialog";

export default function Admin() {
  return (
    <main>
      <UpdateUserDialog />
      <div className="gradiant-violet ">
        <div className="section-admin">
          <div className="server-maintenance">
            <h2>Server status:</h2>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <div className="table-div">
              <table>
                <thead>
                  <tr>
                    <th className="th1">Nikname</th>
                    <th className="th2">Username</th>
                    <th className="th3 ">E-mail</th>
                    <th className="th4">Id</th>
                    <th className="th5">Achvmt</th>
                    <th className="th6">Elo</th>
                    <th className="th7">Games</th>
                    <th className="th8">Wins</th>
                    <th className="th9">Average</th>
                    <th className="th10">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="#" className="td-a">
                        TNTeshka
                      </a>
                    </td>
                    <td>nazar</td>
                    <td>nazar4ik@gmail.com</td>
                    <td>1</td>
                    <td>22</td>
                    <td>1000</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td className="td-change">Change</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#" className="td-a">
                        TNTeshka
                      </a>
                    </td>
                    <td>nazar</td>
                    <td>nazar4ikpavlyuk@gmail.com</td>
                    <td>1</td>
                    <td>22</td>
                    <td>1000</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td className="td-change">Change</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#" className="td-a">
                        TNTeshka
                      </a>
                    </td>
                    <td>nazar</td>
                    <td>nazar4ikpavlyukgg@gmail.com</td>
                    <td>1</td>
                    <td>22</td>
                    <td>1000</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                    <td className="td-change">Change</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
