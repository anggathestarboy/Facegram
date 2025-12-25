<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Follow extends Model
{
    protected $guarded = [];
    protected $table = "follow";
    public $timestamps = false;

    public function follower() {
      return $this->belongsTo(User::class, 'follower_id');
    }
    public function following() {
      return $this->belongsTo(User::class, 'following_id');
    }

    
}
