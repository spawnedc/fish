from rest_framework import serializers, pagination
from fish.models import Payment


class MetaSerializer(serializers.Serializer):
    limit = serializers.Field(source='paginator.per_page')
    count = serializers.Field(source='paginator.count')
    page = serializers.SerializerMethodField('get_current_page')
    total_pages = serializers.Field(source='paginator.num_pages')
    next = pagination.NextPageField(source='*')
    prev = pagination.PreviousPageField(source='*')

    def get_current_page(self, obj):
        return obj.number


class MetaPaginationSerializer(pagination.BasePaginationSerializer):
    _meta = MetaSerializer(source='*')
    results_field = 'results'


class BaseSerializer(serializers.ModelSerializer):
    id = serializers.Field()

    class Meta:
        exclude = ('modified', )


class PaymentSerializer(BaseSerializer):

    class Meta(BaseSerializer.Meta):
        model = Payment