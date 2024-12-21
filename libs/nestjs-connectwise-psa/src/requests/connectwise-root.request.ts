export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ConnectwiseQueryOptions {
  conditions?: string;
  childConditions?: string;
  customFieldConditions?: string;
  orderBy?: string;
  fields?: string[];
  page?: number;
  pageSize?: number;
}

export abstract class ConnectwiseRootRequest {
  abstract method: HTTP_METHOD;
  abstract path: string;
  params?: ConnectwiseQueryOptions;
  data?: any;

  constructor(params?: ConnectwiseQueryOptions, data?: any) {
    if (params && Object.keys(params).length > 0) {
      this.params = params;
    }
    if (data) {
      this.data = data;
    }
  }

  getRequestConfig() {
    const config: any = {
      method: this.method,
      url: this.path,
    };

    if (this.params) {
      const params: any = {};
      if (this.params.conditions) params.conditions = this.params.conditions;
      if (this.params.childConditions) params.childConditions = this.params.childConditions;
      if (this.params.customFieldConditions) params.customFieldConditions = this.params.customFieldConditions;
      if (this.params.orderBy) params.orderBy = this.params.orderBy;
      if (this.params.fields) params.fields = this.params.fields.join(',');
      if (this.params.page) params.page = this.params.page;
      if (this.params.pageSize) params.pageSize = this.params.pageSize;

      if (Object.keys(params).length > 0) {
        config.params = params;
      }
    }

    if (this.data) {
      config.data = this.data;
    }

    return config;
  }
}
