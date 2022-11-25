import React from "react";
import { Table } from "reactstrap";
import isEmpty from "lodash.isempty";
import { Container, Card, CardHeader, CardBody } from "reactstrap";

const Products = ({ products = [] }) => {
  return (
    <Container>
      <Card>
        {isEmpty(products) ? (
          <CardHeader className="text-center fs-4">No products</CardHeader>
        ) : (
          <CardBody>
            <Table striped className="text-center align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {products.map(({ id, title, brand, imageUrl }, i) => (
                  <tr key={id}>
                    <th scope="row">
                      <div className="m-2">{i + 1}</div>
                    </th>
                    <td>{title}</td>
                    <td>{brand}</td>
                    <td>
                      <img
                        src={imageUrl}
                        style={{ width: "50px" }}
                        alt={"product"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        )}
      </Card>
    </Container>
  );
};

export default Products;
