<style>
.q-card {
    width: 100%;
}
</style>
<template>
    <div>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <q-input label="Product Name" v-model="prodname" />
                </div>
                <div class="col-md-4 offset-md-4">
                    <q-input label="Product Description" v-model="desc" />
                </div>
                <div class="col-md-4 offset-md-4">
                    <q-input label="Quantity" v-model="qty" />
                </div>
                <div class="col-md-4 offset-md-4">
                    <q-input label="Price" v-model="price" />
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn color="primary" @click="addProduct" class="full-width" label="ADD PRODUCT" />
                    </div>
                </div>
            </div>

            <!-- <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <q-markup-table>
                        <thead>
                            <tr>
                            <th class="text-left">Product Name</th>
                            <th class="text-right">Description</th>
                            <th class="text-right">Quantity</th>
                            <th class="text-right">Price</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </q-markup-table>
                </div>
            </div> -->

            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <q-table
                    title="My Products"
                    :data="products"
                    :columns="columns"
                    row-key="name">
                    <template v-slot:body-cell-actions="props">
                        <!-- <q-tr :props="props"> -->
                            <q-td :props="props">
                                <!-- <q-btn color="blue" label="Update" size=sm no-caps></q-btn>
                                <q-btn color="red" label="Delete"  size=sm no-caps></q-btn> -->
                                <q-btn dense round flat color="grey" @click="btn_editProd(props)" icon="edit">
                                    <q-tooltip>
                                        UPDATE
                                    </q-tooltip>
                                </q-btn>
                                <q-btn dense round flat color="grey" @click="btn_delProd(props)" icon="delete">
                                    <q-tooltip>
                                        DELETE
                                    </q-tooltip>
                                </q-btn>
                            </q-td>
                        <!-- </q-tr> -->
                    </template>
                    </q-table>
                </div>
            </div>
        </div>

        <q-dialog v-model="prod_modal">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Product Details</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <div class="row">
                        <div class="col-md-12" >
                            <q-form>
                                <q-input v-model="editProd.prodname" label="Product Name"></q-input>
                                <q-input v-model="editProd.description" label="Description"></q-input>
                                <q-input v-model="editProd.qty" label="Quantity"></q-input>
                                <q-input v-model="editProd.price" label="Price"></q-input>

                                <q-card-actions align="right">
                                    <q-btn flat label="UPDATE" color="primary" v-close-popup @click="btn_updateProd" ></q-btn>
                                </q-card-actions>
                            </q-form>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    mounted () {
        this.prodService = this.$dbCon.wingsService('products')
        this.prodService.on('dataChange', (res) => {
        // console.log(res)
        this.products = res;
        // console.log(this.products)
    })
    
        this.prodService.init()

        this.$q.notify.setDefaults({
            position: 'top',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
        })
    },
    data () {
        return {
            confirm_del: false,
            prod_modal: false,
            prodname: '',
            desc: '',
            qty: 0,
            price: 0,
            products: [],
            editProd: [],
            columns: [
                {
                name: 'desc',
                required: true,
                label: 'Product Name',
                align: 'left',
                field: row => row.prodname,
                sortable: true
                },
                { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
                { name: 'qty', label: 'Quantity', field: 'qty', sortable: true },
                { name: 'price', label: 'Price', field: 'price' },
                { name: 'actions', label: 'Actions', field: 'actions'},
            ]
        }   
    },
    methods: {
        showNotif (msg) {
            this.$q.notify({
                message: msg,
                color: 'green'
            })
        },
        addProduct () {
            this.prodService.create({
                prodname: this.prodname,
                description: this.desc,
                qty: this.qty,
                price: this.price
            });
            this.showNotif("Product Added!");
        },
        btn_editProd (props) {
            // console.log(props);
            this.editProd = props.row;
            this.prod_modal = true;
        },
        btn_delProd (props) {
            // console.log(props.row._id);
            this.$q.dialog({
                title: 'Confirm',
                message: 'Remove Product?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.prodService.remove(props.row._id);
                this.showNotif("Product Removed!");
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        },
        btn_updateProd () {
            // console.log(this.editProd.description);
            this.prodService.patch(this.editProd._id, {
                prodname: this.editProd.prodname,
                description: this.editProd.description,
                qty: this.editProd.qty,
                price: this.editProd.price
            });
            this.showNotif("Product Updated");
        }
    }
}
</script>