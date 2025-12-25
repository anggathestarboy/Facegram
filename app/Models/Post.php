<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function attachments() {
        return $this->hasMany(PostAttachment::class, 'post_id', "id");
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
