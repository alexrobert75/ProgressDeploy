import React, { useEffect, useState } from "react";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Modal from "../Modal/Modal";
import ClassesCheck from "../ClassesCheck/ClassesCheck";

const EvaluationsList = ({ data, deleteEval }) => {

  const [searchData, setSearchData] = useState('');
  const [classesToDisplay, setClassesToDisplay] = useState([]);
  const [filterKey, setFilterKey] = useState('date');
  const [filterType, setFilterType] = useState(false);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [listeDesClasses, setListeDesClasses] = useState();


  // Création de la liste des classes

  useEffect(() => {
    const classesList = new Set();
    data?.map((x) => classesList.add(x.userId.schoolClass));
    setListeDesClasses(classesList);
  }, [data]);

  const setFilter = (critere) => {
    setFilterKey(critere);
    setFilterType((prev) => !prev);
  }

  const clickDelete = (x) => {
    setIdToDelete(x);
    setOpen(true);
  }

  const sorter = (a, b) => {
    if (filterKey === 'date') {
      if (filterType) {
        return a.createdAt > b.createdAt ? 1 : -1;
      } else {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    } else if (filterKey === 'globalGrade') {
      if (filterType) {
        return a.globalGrade > b.globalGrade ? 1 : -1;
      } else {
        return a.globalGrade < b.globalGrade ? 1 : -1;
      }
    } else if (filterKey === 'firstName' || filterKey === 'schoolClass') {
      if (filterType) {
        return a.userId[filterKey] > b.userId[filterKey] ? 1 : -1;
      } else {
        return a.userId[filterKey] < b.userId[filterKey] ? 1 : -1;
      }
    }

  }

  return (
    <>
      <Modal open={open} type="delete" idDelete={idToDelete} close={setOpen} deleteEval={deleteEval}/>
      <Search search={setSearchData} />
      {listeDesClasses && <ClassesCheck classes={listeDesClasses} check={setClassesToDisplay} listClasses={classesToDisplay}/>}
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => setFilter('date')}>
              Date
              {filterKey === 'date' && filterType && <Icon name="arrow alternate circle up outline" />}
              {filterKey === 'date' && !filterType && <Icon name="arrow alternate circle down outline" />}
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => setFilter('firstName')}>Nom de l'élève
              {filterKey === 'firstName' && filterType && <Icon name="arrow alternate circle up outline" />}
              {filterKey === 'firstName' && !filterType && <Icon name="arrow alternate circle down outline" />}
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => setFilter('schoolClass')}>Classe
              {filterKey === 'schoolClass' && filterType && <Icon name="arrow alternate circle up outline" />}
              {filterKey === 'schoolClass' && !filterType && <Icon name="arrow alternate circle down outline" />}
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => setFilter('globalGrade')}>Moyenne
              {filterKey === 'globalGrade' && filterType && <Icon name="arrow alternate circle up outline" />}
              {filterKey === 'globalGrade' && !filterType && <Icon name="arrow alternate circle down outline" />}
            </Table.HeaderCell>
            <Table.HeaderCell> </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.filter((x) => { return classesToDisplay.includes(x.userId.schoolClass)}).filter((x) => { return x.userId.firstName.toLowerCase().includes(searchData.toLowerCase()) || x.userId.lastName.toLowerCase().includes(searchData.toLowerCase())}).sort(sorter).map((evaluation) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    {moment(evaluation.createdAt).locale("fr").format("LL")}
                  </Table.Cell>
                  <Table.Cell>
                    {evaluation.userId.firstName} {evaluation.userId.lastName}
                  </Table.Cell>
                  <Table.Cell>{evaluation.userId.schoolClass}</Table.Cell>
                  {evaluation.globalGrade < 2 && (
                    <Table.Cell negative>
                      <b> {evaluation.globalGrade}</b>
                    </Table.Cell>
                  )}
                  {evaluation.globalGrade > 2 && (
                    <Table.Cell positive>
                      <b> {evaluation.globalGrade}</b>
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <Link to={`/evaluation/${evaluation._id}`}>
                      <Button color="olive">Voir détails</Button>
                    </Link>
                    <Link to={`/teacher/evaluation/${evaluation._id}`}>
                      <Button color="orange">Modifier</Button>
                    </Link>
                    <Button color="red" onClick={() => clickDelete(evaluation._id)}>Supprimer</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default EvaluationsList;
