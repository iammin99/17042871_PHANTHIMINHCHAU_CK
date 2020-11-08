import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private db: DynamoDB;
    private docClient: DynamoDB.DocumentClient;
    private tableName = process.env.AWS_DYNAMODB_TABLE;

    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DYNAMODB_REGION || 'ap-southeast-1'
        });

        this.db = new DynamoDB();
        this.docClient = new DynamoDB.DocumentClient();
    }

    public findAll(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: this.tableName
            };

            this.docClient.scan(params, function (err, data) {
                if (err) {
                    reject(`Unable to read item. Error JSON: ${JSON.stringify(err, null, 2)}`);
                } else {
                    const items = _.get(data, 'Items', []);
                    resolve(items)
                }
            });
        });
    }

    public findById(maSanPham: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: this.tableName,
                Key:{
                    "maSanPham" : maSanPham
                }
            };

            this.docClient.get(params, function (err, data) {
                if (err) {
                    reject(`Unable to read item. Error JSON: ${JSON.stringify(err, null, 2)}`);
                } else {
                    const item = _.get(data, 'Item', new Product('', '', 1));
                    resolve(item)
                }
            });
        });
    }

    public update(maSanPham: string, product: Product): Promise<boolean> {
        return new Promise((resolve, reject) => {
            product.maSanPham = maSanPham;

            const params = {
                TableName: this.tableName,
                Key: {
                    "maSanPham": maSanPham
                },
                UpdateExpression: "set tenSanPham = :tenSanPham, soLuong = :soLuong",
                ExpressionAttributeValues: {
                    ":tenSanPham": product.tenSanPham,
                    ":soLuong": product.soLuong
                },
                ReturnValues: "UPDATED_NEW"
            };

            this.docClient.update(params, function (err, data) {
                if (err) {
                    reject(`Unable to read item. Error JSON: ${JSON.stringify(err, null, 2)}`);
                } else {
                    resolve(true)
                }
            });
        });
    }
}
